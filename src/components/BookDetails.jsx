import React, { useState, useEffect } from 'react'
import { useBooksContext } from '../hooks/useBooksContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

export const BookDetails = ({ book }) => {

  const { user } = useAuthContext();
  const { dispatch } = useBooksContext()
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [pages, setPages] = useState(book.pages);
  const [price, setPrice] = useState(book.price);
  const [isbn, setIsbn] = useState(book.isbn);
  const [binding, setBinding] = useState(book.binding);
  const [description, setDescription] = useState(book.description);
  const [tags, setTags] = useState(book.tags);
  const [tagInput, setTagInput] = useState('');
  const formattedPublictionDate = new Date(book.publicationDate).toISOString().slice(0, 10);
  const [publicationDate, setPublicationDate] = useState(formattedPublictionDate);
  const [coverUrl, setCoverUrl] = useState(book.cover);
  const [pdfFile, setPdfFile] = useState(book.pdfFile);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    const fetchCover = async () => {
      if (book.cover) {
        try {
          const response = await fetch(`/api/${book.cover}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (response.ok) {
            const coverBlob = await response.blob();
            const coverObjectUrl = URL.createObjectURL(coverBlob);
            setCoverUrl(coverObjectUrl);
          } else {
            setError('Failed to load cover!');
          }
        } catch (err) {
          setError(err);
        }
      }
    };
    fetchCover();

    const fetchPdfFile = async () => {
      if (book.pdfFile) {
        try {
          const response = await fetch(`/pdf-files/${book.pdfFile}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const pdfBlob = await response.blob();
            const pdfFileURL = URL.createObjectURL(pdfBlob);
            setPdfFile(pdfFileURL);
          } else {
            setError('Failed to load PDF!');
            return;
          }
        } catch (err) {
          setError(err);
        }
      }
    }

    fetchPdfFile();
    fetchCover();
  }, [book.cover, book.pdfFile]);





  const handleAddTag = () => {
    if (tagInput) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    if (user.role === 0) {
      setError('Admins only!');
      return;
    }
    const token = JSON.parse(localStorage.getItem('token'));

    const response = await fetch(`/api/books/${book._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_BOOK', payload: json })
    }

  }

  const handleEditStart = () => {
    setEditing(true);
  }

  const handleEditCancel = () => {
    setEditing(false);
    setTitle(book.title);
    setAuthor(book.author);
    setPages(book.pages);
    setPrice(book.price);
    setIsbn(book.isbn);
    setBinding(book.binding);
    setPublicationDate(formattedPublictionDate);
    setDescription(book.description);
    setTags(book.tags);
    setTagInput('');
  }

  const handleEditSave = async () => {

    if (
      title === book.title &&
      author === book.author &&
      pages === book.pages &&
      price === book.price &&
      isbn === book.isbn &&
      binding === book.binding &&
      publicationDate === formattedPublictionDate &&
      description === book.description &&
      JSON.stringify(tags) === JSON.stringify(book.tags) // Compare arrays properly
    ) {
      setEditing(false);
      return;
    }

    if (!user) {
      setError('No user!');
      return;
    }

    const updatedBook = {
      title,
      author,
      pages,
      price,
      isbn,
      binding,
      publicationDate,
      description,
      tags
    };

    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`/api/books/${book._id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBook)
    })

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'EDIT_BOOK', payload: json });
      setEditing(false);
    } else {
      setError(json.error || 'Failed to update the book!');
    }
  }

  return (
    <>
      {
        editing ? (
          <>
            <div className='book'>
              <h4>Edit Book</h4>
              <strong>Title</strong>
              <div className="input-box">
                <input
                  name='title-input'
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </div>
              <strong>Author</strong>
              <div className="input-box">
                <input
                  name='author-input'
                  type="text"
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                  required
                />
              </div>
              <strong>Pages</strong>
              <div className="input-box">
                <input
                  name='pages-input'
                  type="number"
                  onChange={(e) => setPages(e.target.value)}
                  value={pages}
                  required
                />
              </div>
              <strong>Price</strong>
              <div className="input-box">
                <input
                  name='price-input'
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>
              <strong>ISBN</strong>
              <div className="input-box">
                <input
                  name='isbn-input'
                  type="number"
                  onChange={(e) => setIsbn(e.target.value)}
                  value={isbn}
                  required
                />
              </div>
              <strong>Binding</strong>
              <div className="input-box">
                <input
                  name='binding-input'
                  type="text"
                  onChange={(e) => setBinding(e.target.value)}
                  value={binding}
                  required
                />
              </div>
              <strong>Publication Date</strong>
              <div className="input-box">
                <input
                  name='publication-date-input'
                  type="date"
                  onChange={(e) => setPublicationDate(e.target.value)}
                  value={publicationDate}
                  required
                />
              </div>
              <strong>Description</strong>
              <div className="input-box">
                <input
                  name='description-input'
                  type="text"
                  onChange={(e) => setPublicationDate(e.target.value)}
                  value={publicationDate}
                  required
                />
              </div>
              <div>
                <form onSubmit={(e) => { e.preventDefault() }}>
                  <div className='input-box d-flex-row'>
                    <input
                      name='tag-input'
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Enter tag"
                    />
                    <button onClick={handleAddTag} type='submit' className='primary-styled-button-sm'>Add Tag</button>
                  </div>
                </form>
                <div className="tags-container">
                  {tags.map((tag, index) => (
                    <span key={index} className='tag'>
                      {tag}
                      <span className="material-symbols-outlined material-button" onClick={() => handleRemoveTag(index)}>Close</span>
                    </span>
                  ))}
                </div>
              </div>
              {
                error &&
                <div className='d-flex-row align-items-center gap-10-px'>
                  <div className='error'>
                    {error}
                  </div>
                </div>
              }
              <div className="edit-delete-button-container">
                <button className="material-symbols-outlined d-flex-row material-button" onClick={handleEditSave}>Done</button>
                <button className="material-symbols-outlined d-flex-row material-button" onClick={handleEditCancel}>Close</button>
              </div>
              <div className="d-flex-row space-between width-90p mt-20-px">
                {(!editing && user && user.role === 1) && (
                  <span className="material-symbols-outlined material-button" onClick={handleEditStart}>Edit</span>
                )}
                {(user && user.role === 1) && <span className="material-symbols-outlined material-button" onClick={handleDelete}>Delete</span>}
              </div>
            </div>
          </>
        ) : (
          <div className='book'>
            <div className='d-flex-col'>
              {coverUrl && (
                <img src={coverUrl} alt={`${book.title} cover`} />
              )}
              <span>{book.title}</span>
              <p><strong>Author: </strong>{book.author}</p>
              <p><strong>Pages: </strong>{book.pages}</p>
              <p><strong>Price: </strong>{book.price}</p>
              <p><strong>ISBN: </strong>{book.isbn}</p>
              <p><strong>Binding: </strong>{book.binding}</p>
              <p><strong>Publication Date: </strong>{formattedPublictionDate}</p>
              <p><strong>Description: </strong>{book.description}</p>
              <p><strong>Tags: </strong>{book.tags.join(', ')}</p>
            </div>
            <div className="edit-delete-button-container">
              {(!editing && user && user.role === 1) && (
                <span className="material-symbols-outlined d-flex-row material-button" onClick={handleEditStart}>Edit</span>
              )}
              {(user && user.role === 1) && <span className="material-symbols-outlined d-flex-row material-button" onClick={handleDelete}>Delete</span>}
            </div>
            {(pdfFile && user && user.role === 1) ? (
              <button className='primary-styled-button'>
                <Link to="/pdf-viewer" state={{ pdfUrl: pdfFile }}>
                  Read Book
                </Link>
              </button>
            ) : (
            <button className='primary-styled-button shop-now'>
              Shop Now
            </button>
            )
            }
          </div>
        )
      }
    </>
  )
}