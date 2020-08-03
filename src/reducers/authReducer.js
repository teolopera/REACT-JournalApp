import { types } from "../types/types";
/*
 *  EL STATE VA A ESTAR VACIO CUANDO NO ESTE AUTENCTICADO EL USUARIO, CUANDO LO ESTE 
 * VA A TENER LO SIGUIENTE
 * {
 *      uid: 'askndlsan23123',
 *      name: 'Fernando'
 * } 
 *
 */

/* LOS REDUCERS RECIBEN EL STATE Y EL ACTION */
/* DEFINIMOS EL STATE COMO UN OBJETO VACIO, ES IMPORTANTE INICIALIZARLO */
export const authReducer = ( state={}, action ) => {

    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        case types.logout:
            return {}
    
        default:
            return state;
    }

}