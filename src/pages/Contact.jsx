import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'

export const Contact = () => {

    const { user } = useAuthContext();

    return (
        <div className='about-section'>
            <div className='about-section-heading'>
                <h2>
                    CONTACT US
                </h2>
                <div className='seperator-line-sm'></div>
            </div>
            <h3>
                We love to see you..!
            </h3>
            <div className='contact-items-container'>
                <div className='contact-item'>
                    <span className="material-symbols-outlined">
                        mail
                    </span>
                    <span>
                        info@booktimepublication.com.pk
                    </span>
                </div>
                <div className='contact-item'>
                    <span className="material-symbols-outlined">
                        call
                    </span>
                    <span>
                        042-37163413
                    </span>
                </div>
                <div className='contact-item'>
                    <span className="material-symbols-outlined">
                        location_on
                    </span>
                    <span>
                        Shop #1, Al Noor Center 38 Ghazni Street, Urdu Bazar, Lahore
                    </span>
                </div>
            </div>
            <button className='primary-styled-button'>
                {!user && <Link to='/signup'>
                    REGISTER
                </Link>}
                {
                    user &&
                    <Link to='/books'>
                        Get Started
                    </Link>
                }
            </button>
        </div>
    )
}
