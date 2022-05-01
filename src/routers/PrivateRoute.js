import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ isAuthenticated, element: CalendarPage }) => {
    // localStorage.setItem('lastPath', rest.location.pathname);
    // console.log(CalendarPage);

    return (
        isAuthenticated
            ? CalendarPage
            : <Navigate to='/login' />
    )
}

PrivateRoute.prototype = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}