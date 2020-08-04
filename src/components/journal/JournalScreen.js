import React from 'react'
import { Sidebar } from './Sidebar'
import { NoteScreen } from '../notes/NoteScreen'
import { useSelector } from 'react-redux'
import { NothingSelected } from './NothingSelected'

export const JournalScreen = () => {

    const { active } = useSelector( state => state.notes )

    return (
        <div 
            className="journal__main-content animate__animated animate__fadeIn animate__faster"
        >
            
            <Sidebar />

            <main>

                {
                    /* PODEMOS HACER LA CONDICION QUE SI ES DIFERENTE DE NULL, PERO DEJARLO ASI
                    SERIA LO MISMO */
                    ( active )
                        ? (<NoteScreen />)
                        : (<NothingSelected />)
                }                

            </main>

        </div>
    )
}
