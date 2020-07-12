import { 
    PROJECT_FORM, 
    GET_PROJECTS,
    CREATE_PROJECT,
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT
} from '../../types'; 

export default (state, action) => {
    switch(action.type) {

        case PROJECT_FORM:
            return {
                ...state,
                formIsVisible: true
            }
        
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        
        case CREATE_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                formIsVisible: false,
                invalidForm: false
            }
        
        case VALIDATE_FORM:
            return {
                ...state,
                invalidForm: true
            }

        case CURRENT_PROJECT:
            return {
                ...state,
                project: state.projects.filter(project => project.id === action.payload)
            }
        
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload),
                project: null
            }
            
        default:
            return state;
    }
}