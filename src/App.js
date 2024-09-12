import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile'
import { BookForm } from './components/BookForm';
import { Footer } from './components/Footer';
import Books from './pages/Books';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PDFViewer } from './components/PDFViewer';

function App() {

  const { user } = useAuthContext();

  return (
    <div className="app">
      <BrowserRouter>
        <div className='main-container'>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path='/books'
              element={<Books />}
            />
            <Route
              path='/contact'
              element={<Contact />}
            />
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path='/profile'
              element={user ? <Profile user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path='/pdf-viewer'
              element={user ? <PDFViewer pdfUrl=""/> : <Navigate to="/login" />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path='/create'
              element={(!user || !user.role === 1) ? <Navigate to="/" /> : <BookForm />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;







// I GOT YOU MEANIE :)