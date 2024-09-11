import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    const fetchUser = async (token) => {
        const response = await fetch('/api/user/me', {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });

        const user = await response.json();

        if(response.ok) {
            dispatch({ type: 'LOGIN', payload: user });
        } else {
            console.error('Error fetching user: ', user.error);
        }
    };

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));

        if(token) {
            fetchUser(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )}
