import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {updateTeam} from '../../../actions';

import history from '../../../history';

import '../../UserProfile/userProfile.css';

class TeamAboutForm extends React.Component {

    renderInput =  (formProps) => {
        return (
            <div className="field">
                <label>{formProps.label}</label>
                <input {...formProps.input} type={formProps.type} autoComplete="off" placeholder={`Enter your ${formProps.label}.`}/>
            </div>
        );
    }

    onSubmit = async (formValues) => {
        try{
            await this.props.updateTeam(this.props.team.id, {...this.props.team, ...formValues});
        }catch(e){
            return
        }
        history.goBack();
    }
    
    render() {
        return(
            <div className="ui container">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                    <Field name="about" component={this.renderInput} label="About" type="text"/>
                    <button className="ui button teal">Submit</button>
                </form>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'teamAboutForm'
})(TeamAboutForm);

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps, {updateTeam})(formWrapped);