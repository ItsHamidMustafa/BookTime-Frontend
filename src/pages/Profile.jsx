import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Profile() {
    const { user, dispatch } = useAuthContext();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const avatar = user.avatar;

    const handleUpdateClick = async () => {
        setError(null);
        setSuccess(false);
        let updatedUser = { firstName, lastName };

        if (firstName === user.firstName && lastName === user.lastName) {
            setIsEditing(false);
            return;
        }

        if (!user) {
            setError("You must be logged in");
            return;
        }


        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const response = await fetch(`/api/user/update/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error);
            }

            console.log('Profile updated successfully:', json);
            const updatedUserWithToken = { ...json, token: user.token };
            dispatch({ type: 'LOGIN', payload: updatedUserWithToken });
            setSuccess(true);
        } catch (err) {
            console.error('Profile update failed:', err.message);
            setError(err.message);
        }

        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setIsEditing(false);
    };

    return (
        <div className='profile'>
            <h3>Account</h3>
            <div className='seperator-line-sm'></div>
            <span>Real-time information of your profile.</span>
            <img src={avatar} alt="Error loading img" className='user-avatar-medium' />
            <strong>Profile Picture</strong>
            {isEditing ? (
                <>
                    <div className='mt-20-px two-col-grid gap-2-percent justify-content-center'>
                        <label htmlFor="firstName-edit-input">First name</label>
                        <div className="input-box">
                            <input
                                id='firstName-edit-input'
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />
                        </div>
                        <label htmlFor="lastName-edit-input">Last name</label>
                        <div className="input-box">
                            <input
                                id='lastName-edit-input'
                                type="text"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </div>
                    </div>
                    <div className='profile-edit-save-button-container'>
                        <button onClick={handleUpdateClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <div>
                            <strong>First name:</strong> {firstName}
                        </div>
                        <div>
                            <strong>Last name:</strong> {lastName}
                        </div>
                    </div>
                    <button className='primary-styled-button' onClick={handleEditClick}>Edit Profile</button>
                </>
            )}
            {error && <div className='error'>{error}</div>}
            {success && <div className='success mt-20-px'>Profile updated successfully</div>}
        </div>
    );
}