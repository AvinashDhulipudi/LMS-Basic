import { GET_ENROLLED_CLASSES, LOADING, GET_UNENROLLED_CLASSES, CLEAR_CURRENT_USER, ENROLL_CLASS, UNENROLL_CLASS } from '../actions/types';

const initialState = {
    enrolled: null,
    unenrolled: null,
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type){
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ENROLLED_CLASSES:
            return {
                ...state,
                enrolled: action.payload,
                loading: false
            }
        case GET_UNENROLLED_CLASSES:
            return {
                ...state,
                unenrolled: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_USER:
            return {
                ...state,
                enrolled: null,
                unenrolled: null,
                loading: false
            }
        case ENROLL_CLASS:
            return {
                ...state,
                loading: false
            }
        case UNENROLL_CLASS:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}