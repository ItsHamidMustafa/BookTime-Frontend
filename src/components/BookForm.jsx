import React, { useState } from 'react'
import { useBooksContext } from '../hooks/useBooksContext';
import { useAuthContext } from '../hooks/useAuthContext';

export const BookForm = () => {

    const { user } = useAuthContext();
    const { dispatch } = useBooksContext();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [pages, setPages] = useState('');
    const [price, setPrice] = useState('');
    const [isbn, setIsbn] = useState('');
    const [binding, setBinding] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [coverImageError, setCoverImageError] = useState(null);
    const [coverImage, setCoverImage] = useState('');
    const [pdfFile, setPdfFile] = useState('');

    const handleCoverImageChange = (e) => {
        setCoverImage(e.target.files[0]);
    };

    const handlepdfChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleAddTag = () => {
        if (tagInput) {
            setTags([...tags, tagInput]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleBookSave = async () => {


        if (user.role === 0) {
            setError('Admins only!');
            return;
        }

        if (!title || !author || !pages || !price || !isbn || !binding || !publicationDate || !tags) {
            setError('All fields must be filled! buddy');
            return;
        }

        if (isbn.length !== 13) {
            setError('ISBN should be of 13 digits!');
            return
        }

        const token = JSON.parse(localStorage.getItem('token'));
        let coverFileName = '';
        let pdfFileName = '';

        if (coverImage) {
            const formData = new FormData();
            formData.append('cover', coverImage);
            formData.append('id', user._id);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData,
                });

                const responseData = await response.json();

                if (!response.ok) {
                    setCoverImageError(responseData.msg);
                    return;
                }

                coverFileName = responseData.filename;
            } catch (error) {
                setCoverImageError('Error uploading cover image');
            }
        }

        if (pdfFile) {
            const formData = new FormData();
            formData.append('pdfFile', pdfFile);

            try {
                const response = await fetch('/api/upload-pdf', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData,
                });

                const responseData = await response.json();

                if (!response.ok) {
                    setError(responseData.error);
                    return;
                }

                pdfFileName = responseData.filename;
            } catch (err) {
                setError(err);
                return;
            }
        }

        const book = { 
            title, 
            author, 
            pages, 
            price, 
            isbn, 
            binding, 
            publicationDate, 
            description, 
            tags, 
            cover: coverFileName, 
            pdfFile: pdfFileName
         };



        try {
            const response = await fetch('/api/books/', {
                method: 'POST',
                body: JSON.stringify(book),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
                return;
            }

            setSuccess('Book created successfully!');
            console.log('Book uploaded', json);
            setTitle('');
            setAuthor('');
            setPages('');
            setPrice('');
            setIsbn('');
            setBinding('');
            setPublicationDate('');
            setDescription('');
            setTags([]);
            setTagInput('');
            dispatch({ type: 'CREATE_BOOK', payload: json });
            setSuccess('Book created successfully!');
        } catch (err) {
            setError('An error occured while saving the book.');
        }

    }

    return (
        <div className='book-form'>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="book-pdf-file">
                    PDF File:
                    <div className='input-box'>
                        <input
                            id="book-pdf-file"
                            type="file"
                            onChange={handlepdfChange}
                            accept="application/pdf"
                        />
                    </div>
                </label>
                <label htmlFor="book-cover-image">
                    Cover Image:
                    <div className='input-box'>
                        <input
                            id="book-cover-image"
                            type="file"
                            onChange={handleCoverImageChange}
                            accept="image/*"
                        />
                    </div>
                </label>
                <label htmlFor="book-title">
                    Title:
                    <div className='input-box'>
                        <input id="book-title"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required />
                    </div>
                </label>
                <label htmlFor="book-author">
                    Author:
                    <div className='input-box'>
                        <input id="book-author"
                            type="text"
                            onChange={(e) => setAuthor(e.target.value)}
                            value={author}
                            required />
                    </div>
                </label>
                <label htmlFor="book-pages">
                    Pages:
                    <div className='input-box'>
                        <input
                            id="book-pages"
                            type="number"
                            onChange={(e) => setPages(e.target.value)}
                            value={pages}
                            required />
                    </div>
                </label>
                <label htmlFor="book-price">
                    Price (PKR):
                    <div className='input-box'>
                        <input
                            id="book-price"
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required />
                    </div>
                </label>
                <label htmlFor="book-isbn">
                    ISBN:
                    <div className='input-box'>
                        <input
                            id="book-isbn"
                            type="number"
                            onChange={(e) => setIsbn(e.target.value)}
                            value={isbn}
                            required />
                    </div>
                </label>
                <label htmlFor="book-binding">
                    Binding:
                    <div className='input-box'>
                        <input
                            id="book-binding"
                            type="text"
                            onChange={(e) => setBinding(e.target.value)}
                            value={binding}
                            required />
                    </div>
                </label>
                <label htmlFor="book-publication-date">
                    Publication Date:
                    <div className='input-box'>
                        <input
                            id="book-publication-date"
                            type="date"
                            onChange={(e) => setPublicationDate(e.target.value)}
                            value={publicationDate}
                            required />
                    </div>
                </label>
                <label htmlFor="book-description">
                    Description:
                    <div className='input-box'>
                        <textarea rows={10} id="book-description"
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required />
                    </div>
                </label>
                <div>
                    <div className='input-box d-flex-row'>
                        <input
                            id='book-tag'
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="Enter tag"
                        />
                        <button onClick={handleAddTag} className='primary-styled-button-sm'>Add Tag</button>
                    </div>

                    <div className="tags-container">
                        {tags.map((tag, index) => (
                            <span key={index} className='tag'>
                                {tag}
                                <span className="material-symbols-outlined d-flex-row material-button" onClick={() => handleRemoveTag(index)}>Close</span>
                            </span>
                        ))}
                    </div>
                </div>
                {
                    success &&
                    <div className='success'>
                        {success}
                        <span className="material-symbols-outlined material-button" onClick={() => setSuccess(null)}>
                            close
                        </span>
                    </div>
                }
                {
                    error && <div className='error'>
                        {error}
                        <span className="material-symbols-outlined material-button" onClick={() => setError(null)}>
                            close
                        </span>
                    </div>
                }
                {
                    coverImageError && <div className='error'>
                        {coverImageError}
                        <span className="material-symbols-outlined d-flex-row material-button" onClick={() => setCoverImageError(null)}>
                            close
                        </span>
                    </div>
                }
                <button id="book-save-button" className='primary-styled-button' onClick={handleBookSave}>Create</button>
            </form>
        </div>
    )
}