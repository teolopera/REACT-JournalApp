/* EL STORE ES LA FUENTE UNICA DE INFORMACION */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
/* IMPORTAMOS EL REDUX-THUNK EL CUAL SIRVE PARA IMPLEMENTAR EL MIDDLEWARE */
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';

/* ESTA CONSTANTE HABILITA LAS EXTENSIONES DEL DEVTOOLS Y PERMITE ENVIAR MIDDLEWARES */
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/* UTILIZAMOS COMBINEREDUCERS PARA PERMITIRLE AL STORE RECIBIR VARIOS REDUCERS EN VEZ DE UNO SOLO */
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

/* EL STORE RECIBE UN REDUCER LE MANDAMOS EL OBJETO CON LOS REDUCERS */
export const store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
    );

/* NECESITAMOS LLEVAR EL STORE AL PUNTO MAS ALTO DE LA APLICACION, QUE EN ESTE CASO SERIA JOURNALAPP */
/* ESE SEGUNDO ARGUMENTO SE ENCUENTRA AQUI https://github.com/zalmoxisus/redux-devtools-extension#usage */