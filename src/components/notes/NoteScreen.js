import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { activeNote, startDeleting } from '../../actions/notes'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    /* LO RENOMBRAMOS A NOTE */
    const { active: note } = useSelector(state => state.notes)
    // console.log(note)

    const [ formValues, handleInputChange, reset ] = useForm( note );
    // console.log(formValues);

    const { body, title, id } = formValues;

    /* ME PERMITE ALMACENAR UNA VARIABLE MUTABLE QUE NO VA A REDIBUJAR TODO EL COMPONENTE SI CAMBIA */
    const activeId = useRef( note.id );

    /* USAMOS EL USEEFFECT PARA SABER SI CAMBIO EL ESTADO DEL FORMULARIO */
    useEffect(() => {
        
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }

    }, [note, reset])

    /* AQUI ACTUALIZAMOS EL ESTADO DE LA NOTA CUANDO SE HACE UNA MODIFICACION */
    useEffect(() => {
        
        dispatch( activeNote( formValues.id, { ...formValues } ) )

    }, [ formValues, dispatch ])

    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name= "title"
                    value= { title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="¿What happened today?"
                    className="notes__textarea"
                    name= "body"
                    value= { body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    (note.url) 
                    && (
                        <div className="notes__image">
                            <img 
                                src= { note.url }
                                alt="landscape"
                            />
                        </div>
                    )
                }

            </div>

            <button
                className="btn btn-danger"
                onClick= { handleDelete }
            >
                Eliminar
            </button>

        </div>
    )
}
