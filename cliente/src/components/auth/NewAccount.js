import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewAccount = () => {

    const [user, setUser] = new useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form onSubmit={onSubmit}>
                <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            placeholder="e.g. John Doe"
                            value={name}
                            onChange={onChange} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="e.g. example@mail.com"
                            value={email}
                            onChange={onChange} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="******"
                            value={password}
                            onChange={onChange} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input 
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="******"
                            value={confirmPassword}
                            onChange={onChange} />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme" />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    &laquo;Volver a Iniciar Sesión&raquo;
                </Link>
            </div>
        </div>
    );
};

export default NewAccount;