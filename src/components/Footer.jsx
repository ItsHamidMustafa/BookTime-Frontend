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
                    <span><a href='https://www.facebook.com/Booktimepublication/' target='_blank' rel='noreferrer'><ion-icon name="logo-facebook"></ion-icon></a></span>
                    <span><a href='https://www.instagram.com/booktimepublication/' target='_blank' rel='noreferrer'><ion-icon name="logo-instagram"></ion-icon></a></span>
                    <span><a href='https://www.youtube.com/@BooktimePublication' target='_blank' rel='noreferrer'><ion-icon name="logo-youtube"></ion-icon></a></span>
                </div>
            </div>
            <div className='address'>
                <div className='footer-contact-item'>
                    <span className="material-symbols-outlined">
                        mail
                    </span>
                    <span>
                        info@booktimepublication.com.pk
                    </span>
                </div>
                <div className='footer-contact-item'>
                    <span className="material-symbols-outlined">
                        call
                    </span>
                    <span>
                        042-37163413
                    </span>
                </div>
                <div className='footer-contact-item'>
                    <span className="material-symbols-outlined">
                        location_on
                    </span>
                    <span>
                        Shop #1, Al Noor Center 38 Ghazni Street, Urdu Bazar, Lahore
                    </span>
                </div>
            </div>
        </div>
    )
}