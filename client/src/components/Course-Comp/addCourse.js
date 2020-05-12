import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import {addClass} from '../../actions/classActions';

class AddClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            startTime: '',
            endTime:'',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const classData = {
          name: this.state.name,
          startTime: this.state.startTime,
          endTime: this.state.endTime
        };
    
        this.props.addClass(classData, this.props.history);
      }
    
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    render() {
        const { errors } = this.state;

        return (
            <div className = "add-class">
                  <div className="container">
                      <div className="row">
                          <div className="col-md-8 m-auto">
                            <h1 className="title"> Add a Class </h1>
                            <h4 className="title"> Let's get some information of your class </h4>
                            <small className="d-block pb-3">*= Required Fields</small>
                            <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                            placeholder="* Course Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                            info="A unique name must be given to each course"
                            />
                            <TextFieldGroup
                            placeholder="Start Time"
                            name="startTime"
                            value={this.state.startTime}
                            onChange={this.onChange}
                            error={errors.startTime}
                            info="Must be between 1 and 24"
                            />
                            <TextFieldGroup
                            placeholder="End Time"
                            name="endTime"
                            value={this.state.endTime}
                            onChange={this.onChange}
                            error={errors.endTime}
                            info="Must be between 1 and 24"
                            />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
                            </form>
                          </div>
                      </div>
                  </div>
            </div>
        )
    }
}

AddClass.PropTypes = {
  name: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})
export default connect(mapStateToProps, {addClass})(withRouter(AddClass));
