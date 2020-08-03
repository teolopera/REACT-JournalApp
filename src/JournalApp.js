import React from 'react';
/* ES COMO EL PROVIDER QUE HACIAMOS ANTERIORMENTE */
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';

export const JournalApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}

/* IMPORTAMOS LA FUENTE UNICA DE INFORMACION (STORE) - REDUX */