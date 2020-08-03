import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { firebase } from '../firebase/firebaseConfig';
import { AuthRouter } from './AuthRouter'
import { JournalScreen } from '../components/journal/JournalScreen'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    /* ESTO SERA COMO UNA BANDERA QUE REVISA EL ESTADO DE FIREBASE, SI ESTA AUTENTICADO O NO */
    const [checking, setChecking] = useState(true)

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    /* ESTO LO MANDA FIREBASE CADA QUE CAMBIA EL ESTADO DE LA AUTENTICACION Y EL CALLBACK SIEMPRE SE 
    VA A ESTAR EJECUTANDO */
    useEffect(() => {

        /* ESTO RETORNA UN OBSERVABLE QUE SE VA A DISPARAR EN CADA CAMBIO */
        firebase.auth().onAuthStateChanged( (user) => {
            
            /* SI EL OBJETO USER TIENE ALGO, ENTONCES PREGUNTA SI EXISTE LA PROPIEDAD UID */
            if ( user?.uid) {
                dispatch( login( user.uid, user.displayName) );
                setIsLoggedIn( true );
            } else {
                setIsLoggedIn( false );
            }

            setChecking(false)

        });
        
    }, [ dispatch, setChecking, setIsLoggedIn ])

    if( checking ) {
        return (
            <h1>Espere...</h1>
        )
    }

    return (

        <Router>
            
            <Switch>

                <PublicRoute 
                    path="/auth"
                    component={ AuthRouter }
                    isLoggedIn = {isLoggedIn}    
                />
                <PrivateRoute
                    path="/"
                    component={ JournalScreen }
                    isLoggedIn = { isLoggedIn }
                />

                <Redirect to="/auth/login" />

            </Switch>

        </Router>

    )
}
