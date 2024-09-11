import { useAuthContext } from "./useAuthContext";
import { useBooksContext } from './useBooksContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: userBooksDispatch } = useBooksContext();

    const logout = () => {
        localStorage.removeItem('token');

        dispatch({ type: 'LOGOUT' });
        userBooksDispatch ({ type: 'SET_WORKOUTS', payload: null })
    }
    return { logout }
}