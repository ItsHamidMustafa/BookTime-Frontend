import React, { useState } from 'react'
import { BookDetails } from './BookDetails';

export const Search = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');

        if (!query) {
            setError('Please enter a search query.');
            return;
        }


        try {

            const token = JSON.parse(localStorage.getItem('token'));

            const logResponse = await fetch(`/api/search/log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ query })
            });

            const logData = await logResponse.json();


            const response = await fetch(`/api/search/query?query=${query}`);
            const data = await response.json();
            setResults(data);
            if (data.length === 0) {
                setError('No items found!')
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className='search'>
            <h3>Search Book</h3>
            <form onSubmit={handleSearch}>
                <div className='input-box'>
                    <input
                        name='search'
                        type="search"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }}
                        placeholder='Search books...'
                    />
                    <button className='primary-styled-button-sm' type='submit'>Search</button>
                </div>
            </form>
            <ul className='books-search'>
                {results && results.map((book) => (
                    <BookDetails key={book._id} book={book} />
                ))}
            </ul>
            {
                error && <div className='error'>
                    {error}
                    <span className="material-symbols-outlined material-button" onClick={setError(null)}>
                        close
                    </span>
                </div>
            }
        </div>
    )
}