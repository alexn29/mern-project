import React from 'react';

const TopBar = () => {
    return (
        <header className="app-header">
            <p className="nombre-usuario">Hola <span>John Doe</span></p>
            <nav className="nav-principal">
                <a href="#!">Cerrar Sesión</a>
            </nav>
        </header>
    );
};

export default TopBar;