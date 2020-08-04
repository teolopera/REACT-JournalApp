import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";

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

        dispatch(addNewNote( doc.id ))

    }
}

export const activeNote = ( id, note ) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }

});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
         id, ...note
        }
})

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

export const startSaveNote = ( note ) => {

    return async( dispatch, getState) => {

        const { uid } = getState().auth;

        /* ELIMINAMOS EL URL POR QUE FIREBASE NO PERMITE CAMPOS EN NULL */
        if ( !note.url ) {
            delete note.url;
        }

        /* USAMOS EL OPERADOR SPREAD PARA SEPARAR TODA LA NOTA */
        const noteToFirestore = { ...note };
        /* ELIMINAMOS LA PROPIEDAD ID DE LA NOTA PARA NO MODIFICAR EL PRINCIPAL ACCIDENTALMENTE */
        delete noteToFirestore.id;

        /* HACEMOS LA GRABACION DE LA NUEVA NOTA - ACTUALIZACION */
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        /* REFRESCAMOS LAS NOTAS UNA VEZ LAS HAYAMOS ACTUALIZADO */
        dispatch( refreshNote(note.id, noteToFirestore ));

        Swal.fire('saved', note.title, 'success');
    }

}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id, 
            ...note
        }
    }
})

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active: activeNote } = getState().notes; 

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload( file );
        
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ))

        Swal.close();
        

    }
}

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch( deleteNote( id ) );

    }   
}

/* ESTA ACCION MODIFICA EL STORE */
export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});