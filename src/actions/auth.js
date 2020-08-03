/* AQUI PONEMOS LAS ACCIONES, QUE NO SON MAS QUE FUNCIONES */

import Swal from 'sweetalert2'

import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { startLoading, finishLoading } from './ui';

/* PRIMERA ACCION ASINCRONA */
export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {

        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then(({ user }) => {

                dispatch( login(user.uid, user.displayName) );
                dispatch( finishLoading() );

            })
            .catch( err => {
                
                dispatch( finishLoading() );

                /* AQUI UTILIZAMOS EL SWEET ALERT PARA MOSTRAR EL ERROR */
                Swal.fire('Error', err.message, 'error')

            })

    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    /* COMO ESTO ES UNA TAREA ASINCRONA, NECESITAMOS RETORNAR UN CALLBACK */
    /* EN EL MOMENTO EN QUE YA TENGA MI USUARIO EN FIREBASE AHI ES DONDE REALIZARE EL DISPATCH */
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then(async({ user } ) => {

                /* ESTA FUNCION ME PERMITE ACTUALIZAR VALORES EN FIREBASE, COMO EL DISPLAYNAME */
                /* YA QUE ESTE CON UN LOGIN NORMAL NO VENDRIA IMPLEMENTADO */
                await user.updateProfile( {displayName: name });

                // console.log(user)
                dispatch(
                    login( user.uid, user.displayName )
                )

            })
            .catch( err => {
                Swal.fire('Error', err.message, 'error')
            })
    }
}

export const startGoogleLogin = () => {
    /* COMO ES UNA TAREA ASINCRONA RETORNAMOS UN CALLBACK */
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName)
                )
            })
    }   
}

/* PARA NO PONER EL RETURN LO PONEMOS ENTRE PARENTESIS */
/* POR QUE REGRESA UN OBJETO */
export const login = (uid, displayName) => ({
        type: types.login,
        payload: {
            uid, 
            displayName
        }
})

export const startLogout = () => {
    /* COMO ES UN PROCESO ASINCRONO RETORNAMOS UN CALLBACK */
    return async( dispatch ) => {

        await firebase.auth().signOut();

        dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.logout
})