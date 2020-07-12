import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { 
    PROJECT_FORM, 
    GET_PROJECTS,
    CREATE_PROJECT,
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT
} from '../../types'; 

const ProjectState = props => {

    const projects = [
        { id: 1, name: 'Tienda Virtual' },
        { id: 2, name: 'Intranet' },
        { id: 3, name: 'Diseño de Sitio Web' },
        { id: 4, name: 'MERN' }
    ];

    const initialState = {
        projects: [],
        formIsVisible: false,
        invalidForm: false,
        project: null
    }

    // ejecutar acciones
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // funciones para el CRUD
    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    // obtener proyectos
    const getProjects = () => {
        dispatch({
            type: GET_PROJECTS,
            payload: projects
        })
    }

    // agregar proyecto
    const createProject = project => {
        project.id = uuid();

        dispatch({
            type: CREATE_PROJECT,
            payload: project
        })
    }

    // valida el formulario por errores
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }

    // mostrar proyecto seleccionado
    const currentProject = projectId => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        })
    }

    // eliminar proyecto
    const deleteProject = projectId => {
        dispatch({
            type: DELETE_PROJECT,
            payload: projectId
        })
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                formIsVisible: state.formIsVisible,
                invalidForm: state.invalidForm,
                project: state.project,
                showForm,
                getProjects,
                createProject,
                showError,
                currentProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;