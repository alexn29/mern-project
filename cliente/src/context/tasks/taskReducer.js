import { 
    TASKS_PROJECT,
    CREATE_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    STATUS_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK
} from "../../types";

export default (state, action) => {
    switch(action.type) {

        case TASKS_PROJECT:
            return {
                ...state,
                tasksProject: state.tasks.filter(task => task.projectId === action.payload)
            }

        case CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                errorTask: false
            }
        
        case VALIDATE_TASK:
            return {
                ...state,
                errorTask: true
            }
        
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        
        case UPDATE_TASK:
        case STATUS_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
            }
        
        case CURRENT_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }

        case CLEAN_TASK:
            return {
                ...state,
                selectedTask: null
            }

        default:
            return state;
    }
}