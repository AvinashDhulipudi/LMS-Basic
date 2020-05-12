import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { EnrollClass, UnenrollClass } from '../../actions/classActions';

import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';


class ClassGroup extends Component {
    constructor(props){
        super(props);
        this.onRegiteredClicked = this.onRegiteredClicked.bind(this);
        this.onUnregiteredClicked = this.onUnregiteredClicked.bind(this);
    }
    
      onRegiteredClicked(class_id) {
        this.props.EnrollClass(class_id, this.props.history);
      }

      onUnregiteredClicked(class_id) {
        this.props.UnenrollClass(class_id, this.props.history);
      }

    render(){
        const {registered, startTime, endTime, class_id, name} = this.props;
        return (
            <div className="course mb-3 mt-3">
                <div className="course-name">
                    <div className="col-sm-4">
                        <h4> {name.charAt(0).toUpperCase() + name.slice(1)} </h4>
                    </div> 
                    <div className="col-sm-4">
                        {startTime && endTime &&
                            <h4> {startTime} - {endTime} </h4>
                        }
                        {startTime && !endTime &&
                            <h4> {startTime} </h4>
                        }
                        {!startTime && endTime &&
                            <h4> {endTime} </h4>
                        } 
                        {!startTime && !endTime &&
                            <h4> Not Available </h4>
                        }  
                    </div>
                    <div className="col-sm-4">
                    {!registered && <button onClick= {() => this.onRegiteredClicked(class_id)} className = "btn btn-lg btn-info"> Enroll Course </button> } 
                    {registered && <button onClick = {() => this.onUnregiteredClicked(class_id)} className = "btn btn-lg btn-info"> Unenroll Course </button> } 
                    </div>
                </div>
            </div>
        )
    }
}

ClassGroup.propTypes = {
    registered: PropTypes.bool.isRequired,
    EnrollClass: PropTypes.func.isRequired,
    UnenrollClass: PropTypes.func.isRequired,
    class_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startTime: PropTypes.number,
    endTime: PropTypes.number
}

const mapStateToProps = state => ({
    auth: state.auth,
    classes: state.classes
})

export default connect(mapStateToProps, { EnrollClass, UnenrollClass })(withRouter(ClassGroup));