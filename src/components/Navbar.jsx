import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import btLogo from '../media/logo-full.png';


export const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const handleLogoutClick = () => {
        logout();
    }

    return (
        <header>
            <nav>
                <span className='material-symbols-outlined menu-bars' onClick={toggleMenu}>Menu</span>
                <div className={`logo-container ${menuOpen ? 'hidden' : ''}`}>
                    <Link to="/" className='logo-link'>
                        <img src={btLogo} alt="BookTime" className='bt-logo-full' />
                    </Link>
                </div>
                <div className={`nav-center-options-container ${menuOpen ? 'active' : ''}`}>
                    <Link to='/' className='nav-center-option'>Home</Link>
                    <Link to='/about' className='nav-center-option'>About</Link>
                    {user && user.role === 1 && (
                        <Link to="/create">
                            <abbr title='Admin Panel'>
                                <span className="material-symbols-outlined d-flex-row material-button">
                                    admin_panel_settings
                                </span>
                            </abbr>
                        </Link>
                    )}
                    <Link to='/books' className='nav-center-option'>Books</Link>
                    <Link to='/contact' className='nav-center-option'>Contact</Link>
                </div>

                {user && (
                    <div className={`logout-user-container dropdown-trigger ${menuOpen ? 'hidden' : ''}`}>

                        <div className='dropdown-tray'>
                            <Link to="/profile" className='dropdown-tray-element'>Profile</Link>
                            <button onClick={handleLogoutClick} className='dropdown-tray-element'>Log out</button>
                        </div>
                        <span>
                            {user.firstName}
                        </span>
                        <img src={user.avatar} className='user-avatar' alt='user-avatar-loading-error' />
                    </div>
                )}
                {!user && (
                    <div className={`login-signup-container ${menuOpen ? 'hidden' : ''}`}>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar;