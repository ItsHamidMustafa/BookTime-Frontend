import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-links-container'>
                <h2>Useful Links</h2>
                <div className='useful-links'>
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/books">Books</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
            </div>
            <div className='footer-links-container'>
                <h2>Social Links</h2>
                <div className='social-links'>
                    <span><ion-icon name="logo-facebook"></ion-icon></span>
                    <span><ion-icon name="logo-instagram"></ion-icon></span>
                    <span><ion-icon name="logo-youtube"></ion-icon></span>
                </div>
            </div>
            <div className='address'>
                <div className='footer-contact-item'>
                    <span className="material-symbols-outlined">
                        mail
                    </span>
                    <span>
                        info@booktime.com.pk
                    </span>
                </div>
                <div className='footer-contact-item'>
                    <span className="material-symbols-outlined">
                        call
                    </span>
                    <span>
                        042-444444444
                    </span>
                </div>
                <div className='footer-contact-item'>
                    <span className="material-symbols-outlined">
                        location_on
                    </span>
                    <span>
                        Somewhere in Lahore
                    </span>
                </div>
            </div>
        </div>
    )
}