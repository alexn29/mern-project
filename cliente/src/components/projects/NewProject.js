import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

    // obtener state del formulario
    const projectsContext = useContext(projectContext);
    const { formIsVisible, invalidForm, showForm, createProject, showError } = projectsContext;

    const [project, setProject] = useState({
        name: '',
    });

    const { name } = project;

    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitProject = e => {
        e.preventDefault();
        
        if (name === '') {
            showError();
            return;
        }

        createProject(project);

        // reset form
        setProject({
            name: ''
        });
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ () => showForm() }
            >Nuevo Proyecto</button>
            
            { formIsVisible ? 
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProject}>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="name"
                        value={name}
                        onChange={onChangeProject} />

                    <input
                        type="submit"
                        className="btn btn-block btn-primario"
                        value="Agregar proyecto" />
                </form>
                : null
            }

            { invalidForm ? 
                <p className="mensaje error">El nombre del proyecto es obligatorio</p> 
                : null 
            }
            
        </Fragment>
    );
};

export default NewProject;