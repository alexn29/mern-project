import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

import { 
    TASKS_PROJECT,
    CREATE_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    STATUS_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK
} from '../../types';

const TaskState = props => {
    const initialState = {
        tasks: [
            { id: 1, name: 'Elegir Plataforma', status: true, projectId: 1 },
            { id: 2, name: 'Elegir Colores', status: false, projectId: 2 },
            { id: 3, name: 'Elegir Plataformas de pago', status: true, projectId: 3 },
            { id: 4, name: 'Elegir Hosting', status: false, projectId: 4 }
        ],
        tasksProject: null,
        errorTask: false,
        selectedTask: null
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // obtener tareas
    const getTasksByProjectID = id => {
        dispatch({
            type: TASKS_PROJECT,
            payload: id
        })
    }

    // crear tarea
    const createTask = task => {
        task.id = uuid();
        dispatch({
            type: CREATE_TASK,
            payload: task
        })
    }

    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    const deleteTaskByID = id => {
        dispatch({
            type: DELETE_TASK,
            payload: id
        })
    }

    const changeStatus = task => {
        dispatch({
            type: STATUS_TASK,
            payload: task
        })
    }

    const saveCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    const updateTask = task => {
        dispatch({
            type: UPDATE_TASK,
            payload: task
        })
    }

    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                tasksProject: state.tasksProject,
                errorTask: state.errorTask,
                selectedTask: state.selectedTask,
                getTasksByProjectID,
                createTask,
                validateTask,
                deleteTaskByID,
                changeStatus,
                saveCurrentTask,
                updateTask,
                cleanTask
            }}
        >
            { props.children }
        </TaskContext.Provider>
    )
}

export default TaskState;