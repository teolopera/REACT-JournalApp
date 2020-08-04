import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";

export const startNewNote = () => {

    /* LE PASAMOS LA FUNCION GETSTATE DONDE ESTA TODO EL STATE DE LA APLICACION */
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        // console.log(uid)

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        /* OCUPAMOS LA REFERENCIA A LA BASE DE DATOS DE FIREBASE PARA AGREGAR LA COLECCION */
        /* COMO ESTO ES UNA PROMESA PODEMOS CONVERTIR ESTO EN ASYNC - AWAIT */
        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );

        dispatch( activeNote( doc.id, newNote ))
        // console.log(docRef)

    }
}

export const activeNote = ( id, note ) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }

});

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {

        /* ESTA FUNCION REGRESA LAS NOTAS */
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ));

    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

