import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUnenrolledClasses } from '../../actions/classActions';
import Spinner from '../common/Spinner';
import ClassGroup from '../common/Course';
import { Link } from 'react-router-dom';

function renderClasses(classes) {
        return classes.map((classes,index) => (
            <ClassGroup key={index} registered={false} class_id = {classes._id} name={classes.name} startTime={classes.startTime} endTime={classes.endTime} />
        ));
}

class RegisterClass extends Component {
    componentDidMount(){
        this.props.getUnenrolledClasses();
    }

    render() {
        const { user } = this.props.auth;
        const { enrolled, unenrolled, loading } = this.props.classes;

        var Content;
        var courses;

        if(unenrolled === null || loading){
            Content = <Spinner/>;
        }
        else{
            if(Object.keys(unenrolled).length>0){
                courses = renderClasses(this.props.classes.unenrolled);
                //get class details and pass the props
                Content = (
                    <div>
                    <h1 className="title"> Register a Courses</h1>
                    <h4 className="subtitle"> Course Details (Name, StartTime and End Time) </h4>
                    {courses}
                    </div>
                )
            } else {
                Content = (
                    <div>
                        <h1 className="title mb-5"> Register a Courses</h1>
                        <h5 className="mb-3 mt-3"> You have regsitered for all available classes, Please return to Dashboard </h5>
                        <Link to="/dashboard" className = "btn btn-lg btn-info"> Return to Dashboard </Link>
                    </div>
                )
            }
        }
        return (
            <div>
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="dispaly-4"></h1>
                                <div>
                                {Content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

RegisterClass.propTypes = {
    getUnenrolledClasses: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    classes: state.classes,
    auth: state.auth
})

export default connect(mapStateToProps, { getUnenrolledClasses })(RegisterClass);