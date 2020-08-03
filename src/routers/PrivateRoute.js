import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    isLoggedIn,
    /* RENOMBRAMOS EL COMPONENTE */
    component: Component,
    /* RESTO DE LOS COMPONENTES */
    ...rest
}) => {

    return (
        <Route { ...rest }
            component={ (props) => (
                ( isLoggedIn )
                    ? ( <Component { ...props } /> )
                    : ( <Redirect to="/auth/login" /> )
            )}

        />
    )
}

PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}