import { db } from "../firebase/firebaseConfig"

export const loadNotes = async( uid ) => {

    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();

    const notes = [];

    /* GENERAMOS UN NUEVO ARREGLO Y LO ALMACENAMOS EN LAS NOTAS */
    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    // console.log(notes);
    return notes;
}