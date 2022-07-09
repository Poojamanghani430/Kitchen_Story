import React from 'react';
import { from } from 'rxjs';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';

//handle the public routes

function PublicRoute({ component: Component, ...rest}) {
    return (
        <Route
          {...rest}
           render={(props) => getToken() ? <Component {...props} /> : <Redirect to= {{ pathname: '/events' }}/>}
        />
        )
}

export default PublicRoute;