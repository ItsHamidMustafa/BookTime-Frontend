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
                    <span><a href='https://www.facebook.com/azinternationalpublisher' target='_blank' rel='noreferrer'><ion-icon name="logo-facebook"></ion-icon></a></span>
                    <span><a href='https://www.instagram.com/azinternationalpublisher/' target='_blank' rel='noreferrer'><ion-icon name="logo-instagram"></ion-icon></a></span>
                    <span><a href='https://twitter.com/' target='_blank' rel='noreferrer'><ion-icon name="logo-twitter"></ion-icon></a></span>
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