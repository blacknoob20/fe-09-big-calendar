import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ isAuthenticated, element: LoginPage }) => {


    return (
        !isAuthenticated
            ? LoginPage
            : <Navigate to='/' />
    );
}

PublicRoute.prototype = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}