import { useEffect } from 'react'
import { useBooksContext } from '../hooks/useBooksContext';
import { useAuthContext } from '../hooks/useAuthContext'
import { BookDetails } from '../components/BookDetails';
import { Link } from 'react-router-dom';
import { Search } from '../components/Search';
import { Recommendations } from '../components/Recommendations'

const Home = () => {
  const { books, dispatch } = useBooksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books/fetch-latest', {
          method: 'GET',
        });
        const json = await response.json();
  
        if (response.ok) {
          dispatch({ type: 'SET_BOOKS', payload: json });
        } else {
          console.error('Error fetching books:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    fetchBooks();
  }, [dispatch, user]);

  return (
    <>
      <div className="home">
        <section className='hero-section'>
          <h2>
            DISCOVER YOUR NEXT FAVOURITE BOOK!
          </h2>
          <div className='seperator-line'></div>
          <span className='mt-10-px'>
            Explore a vast collection of books, tailored just for you!
          </span>
          <button className='primary-styled-button mt-10-px'>
            {!user && <Link to='/signup'>
              REGISTER &rarr;
            </Link>}

            {
              user &&
              <Link to='/books'>
                GET STARTED
              </Link>
            }
          </button>
        </section>
        {user && <Search />}
        {user && <Recommendations />}
        <>
          {books &&
            <section className='books'>
              <span className='books-span'>OUR RECENT BOOKS</span>
              <div className='books-container'>
                {books.length > 0 ? (
                  books.map((book) => (
                    <BookDetails key={book._id} book={book} />
                  ))
                ) : (
                  <div>No books added yet...</div>
                )}
              </div>
            </section>}
        </>
        <section className='services-section'>
          <div className='services-section-item'>
            <span className="material-symbols-outlined">
              hotel_class
            </span>
            <strong>
              Explore the Best Books
            </strong>
            <span>
              Discover a curated selection of books across all genres, from timeless classics to the latest bestsellers. Dive into a world of stories that captivate your imagination.
            </span>
          </div>
          <div className='services-section-item'>
            <span className="material-symbols-outlined">
              person
            </span>
            <strong>
              Personalized Recommendations
            </strong>
            <span>
              Get tailored book suggestions based on your reading habits. Whether you're into thrillers, romances, or non-fiction, we'll help you find your next favorite read.
            </span>
          </div>
          <div className='services-section-item'>
            <span className="material-symbols-outlined">
              sell
            </span>
            <strong>
              Exclusive Discounts
            </strong>
            <span>
              Sign up to access member-only discounts on top-rated books and new releases. Unlock savings you won't find anywhere else.
            </span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;