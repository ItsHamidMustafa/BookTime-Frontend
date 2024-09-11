import { createContext, useReducer } from "react";

export const BooksContext = createContext()

export const booksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        books: action.payload
      }
    case 'CREATE_BOOK':
      return {
        books: [action.payload, ...state.books]
      }
    case 'DELETE_BOOK':
      return {
        books: state.books.filter((w) => w._id !== action.payload._id)
      }
    case 'EDIT_BOOK':
      state.books.reduce((acc, books) => {
        if (books._id === action.payload._id) {
          acc.push(action.payload)
          return acc;
        } else {
          acc.push(books);
          return acc;
        }
      }, [])
      return {
        books: state.books.reduce((acc, workout) => {
          if (workout._id === action.payload._id) {
            acc.push(action.payload);
          } else {
            acc.push(workout);
          }
          return acc;
        }, [])
      }

    default:
      return state;
  }
}

export const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, {
    books: null
  });



  return (
    <BooksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
};