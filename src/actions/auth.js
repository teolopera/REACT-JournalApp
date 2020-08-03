/* AQUI PONEMOS LAS ACCIONES, QUE NO SON MAS QUE FUNCIONES */

import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types';

/* PRIMERA ACCION ASINCRONA */
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        setTimeout(() => {
            dispatch( login(123, 'pedro') )
        }, 3500);

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