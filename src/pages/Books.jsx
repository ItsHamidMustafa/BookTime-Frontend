import { useEffect } from 'react'
import { useBooksContext } from '../hooks/useBooksContext';
import { useAuthContext } from '../hooks/useAuthContext'
import { BookDetails } from '../components/BookDetails';

const Books = () => {
  const { books, dispatch } = useBooksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/books/', {
        method: 'GET'
      })
      const json = await response.json()

      if (response.ok) {
        console.log(json);
        dispatch({ type: 'SET_BOOKS', payload: json })
      }
    }
    fetchBooks();
  }, [dispatch, user])

  return (
    <>
      <section className='books'>
        <span className='books-span'>BOOKS</span>
        {books &&
          <div className='books-container'>
            {books.length > 0 ? (
              books.map((book) => (
                <BookDetails key={book._id} book={book} />
              ))
            ) : (
              <div>No books added yet...</div>
            )}
          </div>
        }
      </section>
    </>
  );
};

export default Books;