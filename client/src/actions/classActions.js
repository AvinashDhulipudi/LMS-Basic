import axios from 'axios';
import {ENROLL_CLASS, UNENROLL_CLASS, GET_ENROLLED_CLASSES, GET_ERRORS, LOADING, GET_UNENROLLED_CLASSES, CLEAR_CURRENT_USER } from './types';

export const setLoading = () => {
    return {
        type: LOADING
    }
}


//get user registered classes
export const getEnrolledClasses = () => dispatch => {
    dispatch(setLoading());
    axios.get('/api/users/enrolled')
    .then(res => {
        dispatch({
            type: GET_ENROLLED_CLASSES,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ENROLLED_CLASSES,
            payload: {}
        })
    });
};

//enroll a course
export const EnrollClass = (class_id, history) => dispatch => {
    dispatch(setLoading());
    axios.post(`/api/register/${class_id}`)
    .then(res => {
        dispatch({type: ENROLL_CLASS, payload: {}})
            history.push('/dashboard');
        })
    .catch(err => {
        dispatch({
            type: ENROLL_CLASS,
            payload: {}
        })
    });
};

//unenroll a course
export const UnenrollClass = (class_id, history) => dispatch => {
    dispatch(setLoading());
    axios.post(`/api/unregister/${class_id}`)
    .then(res => {
        dispatch({type: UNENROLL_CLASS, payload: {}})
        dispatch(getEnrolledClasses());
    })
    .catch(err => {
        dispatch({
            type: UNENROLL_CLASS,
            payload: {}
        })
    });
};


// get unenrolled classes
export const getUnenrolledClasses = () => dispatch => {
    dispatch(setLoading());
    axios.get('/api/users/remaining')
    .then(res => {
        dispatch({
            type: GET_UNENROLLED_CLASSES,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_UNENROLLED_CLASSES,
            payload: {}
        })
    });
};

// add class
export const addClass = (classData, history) => dispatch => {
    axios
        .post('/api/class/addclass', classData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
};  

//clear user //logout 
export const clearCurrentUser = () => {
    return {
        type: CLEAR_CURRENT_USER
    }
}