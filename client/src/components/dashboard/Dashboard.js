import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEnrolledClasses } from '../../actions/classActions';
import Spinner from '../common/Spinner';
import ClassGroup from '../common/Course';
import { Link } from 'react-router-dom';

function renderClasses(classes) {
        return classes.map((classes,index) => (
            <ClassGroup key={index} registered={true} class_id = {classes._id} name={classes.name} startTime={classes.startTime} endTime={classes.endTime} />
        ));
}

class Dashboard extends Component {
    componentDidMount(){
        this.props.getEnrolledClasses();
    }

    render() {
        const { user } = this.props.auth;
        const { enrolled, unenrolled, loading } = this.props.classes;

        var dashboardContent;
        var courses;

        if(enrolled === null || loading){
            dashboardContent = <Spinner/>;
        }
        else{
            if(Object.keys(enrolled).length>0){
                //get class details and pass the props
                courses = renderClasses(this.props.classes.enrolled);
                dashboardContent = (
                    <div>
                        <h2 className="title mb-4"> DASHBOARD </h2>
                        <h4 className="lead text-muted mb-4"> Welcome {user.name.charAt(0).toUpperCase() + user.name.slice(1)} </h4>
                        <h4 className="subtitle"> Course Details (Name, StartTime and End Time) </h4>
                    {courses}
                    </div>
                )
            } else {
                dashboardContent = (
                    <div>
                        <h2 className="title mb-4"> DASHBOARD </h2>
                        <h4 className="lead text-muted mb-4"> Welcome {user.name.charAt(0).toUpperCase() + user.name.slice(1)} </h4>
                        <p> You are not regsitered to any classes yet, Please register as follow  </p>
                        <Link to="/registerclass" className = "btn btn-lg btn-info center"> Register Course </Link>
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
                                {dashboardContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getEnrolledClasses: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    classes: state.classes,
    auth: state.auth
})

export default connect(mapStateToProps, { getEnrolledClasses })(Dashboard);