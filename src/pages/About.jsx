import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'

export const About = () => {

    const { user } = useAuthContext();

    return (
        <div className='about-section'>
            <div className='about-section-heading'>
                <h2>
                    ABOUT US
                </h2>
                <div className='seperator-line-sm'></div>
            </div>
            <h3>
                Welcome to Book Time Publication.
            </h3>
            <span>
                Our platform is dedicated to providing students, educators, and institutions with a comprehensive range of textbooks and educational resources. Whether you're seeking textbooks for academic courses, reference materials, or study guides, our extensive collection is designed to support diverse learning needs and academic levels.
            </span>
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