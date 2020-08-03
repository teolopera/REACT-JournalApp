import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
/* IMPORTAMOS EL VALIDATOR PARA VALIDAR EL FORMULARIO */
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorAction, removeErrorAction } from '../../actions/ui';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    /* UTILIZAMOS EL HOOK USESELECTOR QUE NOS BIRNDA REACT-REDUX PARA OBTENER PARTE DEL STATE */
    /* ESTE RECIBE UN CALLBACK EN EL CUAL TENGO EL STATE, DEL STATE EXTRAEMOS LA PARTE DE UI Y DESESTRUCTURAMOS */
    const { msgError } = useSelector( state => state.ui );
    // console.log(state)

    const [ formValues, handleInputChange] = useForm({
        name: 'Mateo',
        email: 'msl@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues; 

    const handleRegister = (e) => {

        e.preventDefault();

        if ( isFormValid() ) {
            console.log('Formulario Valido')
        }
    }

    /* HACEMOS LA VALIDACION DEL FORMULARIO */
    const isFormValid = () => {

        if ( name.trim().length === 0 ) {
            dispatch( setErrorAction('Name is required'))
            return false;
        } else if ( !validator.isEmail( email )) {
            dispatch( setErrorAction('Email is invalid'))
            return false;
        } else if ( password !== password2 || password.length < 5) {
            dispatch( setErrorAction('Password should have at least 6 characters and match'))
            return false;
        }

        dispatch( removeErrorAction() )

        return true; 
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>   

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }             

                <Link 
                    to="/auth/login"
                    className="link">
                        ¿Already registered?
                </Link>

            </form>
        </>
    )
}
