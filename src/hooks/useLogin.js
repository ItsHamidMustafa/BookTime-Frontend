import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        localStorage.removeItem('user');

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        } else {
            localStorage.setItem('token', JSON.stringify(json.token));
            const userResponse = await fetch('/api/user/me', {
                headers: { 'Authorization': `Bearer ${json.token}` }
            });

            const user = await userResponse.json();

            if (userResponse.ok) {
                dispatch({ type: 'LOGIN', payload: user });
            } else {
                setError(user.error);
            }

            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};