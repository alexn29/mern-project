import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

import { 
    TASKS_PROJECT,
    CREATE_TASK
} from '../../types';

const TaskState = props => {
    const initialState = {
        tasks: [
            { name: 'Elegir Plataforma', status: true, projectId: 1 },
            { name: 'Elegir Colores', status: false, projectId: 2 },
            { name: 'Elegir Plataformas de pago', status: true, projectId: 3 },
            { name: 'Elegir Hosting', status: false, projectId: 4 }
        ],
        tasksProject: null
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
        dispatch({
            type: CREATE_TASK,
            payload: task
        })
    }

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                tasksProject: state.tasksProject,
                getTasksByProjectID,
                createTask
            }}
        >
            { props.children }
        </TaskContext.Provider>
    )
}

export default TaskState;