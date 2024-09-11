import React, { useState, useEffect } from 'react';
import { BookDetails } from './BookDetails';

export const Recommendations = () => {

    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecommendations = async () => {
            const token = JSON.parse(localStorage.getItem('token'));

            try {
                const response = await fetch('/api/recommendations/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (Array.isArray(data)) {
                    if (data.length === 0) {
                        setError('No recommendations found');
                    } else {
                        setRecommendations(data);
                    }
                } else if (data.msg) {
                    setError(data.msg);
                    setRecommendations(null)
                } else {
                    setError('Unexpected error');
                }
            } catch (error) {
                setError('An error occurred');
            }
        };
        fetchRecommendations();
    }, [])

    return (
        <>
            {
                error && <div className='error'>
                    {error}
                    <span className="material-symbols-outlined material-button" onClick={setError(null)}>
                        close
                    </span>
                </div>
            }
            {recommendations &&
                < div className='books' >
                    <h3>Recommended Books</h3>
                    <ul className='books-container'>
                        {recommendations && recommendations.map(book => (
                            <BookDetails key={book._id} book={book} />
                        ))}
                    </ul>
                </div >
            }
        </>
    )
}