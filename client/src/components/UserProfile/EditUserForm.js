import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {editUser, fetchUserByEmail, signIn} from '../../actions';

import history from '../../history';

class EditUserForm extends React.Component {

    submitFailed = error => {
        this.submit = false;
        this.error = error;
    }

    renderError() {
        if(this.submit === false && this.error) {
            return (
                <div className="ui error message">
                    <ul className="list">
                        <li>{this.error}</li>
                    </ul>
                </div>
            );
        }
    }

    containsSpecialChars = (str) => {
        const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
        return specialChars.test(str);
    }

    renderInput =  (formProps) => {
        const className=`field required ${this.submit === false && !this.error ? 'error' : ''}`;
        return (
            <div className={className}>
                {this.renderError()}
                <label>{formProps.label}</label>
                <input {...formProps.input} type={formProps.type} autoComplete="off" placeholder={`Enter your ${formProps.label}.`}/>
            </div>
        );
    }

    onSubmit = async (formValues) => {
        if (!formValues.displayName) {
            this.submitFailed(null);
            return
        }
        if (5 > formValues.displayName.length) {
            this.submitFailed('Your display name must be at least 5 characters long.');
            return
        }
        if (formValues.displayName.length > 24) {
            this.submitFailed('Your display name must be at most 24 characters long.');
            return 
        }
        if (this.containsSpecialChars(formValues.displayName)) {
            this.submitFailed('Your display name must not include special characters.');
            return
        }
        if (!formValues.displayName.match(/^[A-z]/)) {
            this.submitFailed('Display name must start with a letter.');
            return
        }
        const cUser = this.props.auth.user;
        cUser.displayName = formValues.displayName;
        try {
            await this.props.editUser(cUser.id, cUser);
        }catch(e) {
            if(e.message === "Request failed with status code 500") {
                this.submitFailed("Request Failed.");
            }
            return
        }
        await this.props.fetchUserByEmail(cUser.email);
        const cUser2 = this.props.users.find(u => {return u.email === cUser.email.toLowerCase()});
        this.props.signIn(cUser2);
        history.push(`/profile/${cUser.id}/${formValues.displayName}`);
    }
    
    render() {
        return(
            <div className="ui container">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="displayName" component={this.renderInput} label="Display name" type="text"/>
                    <button className="ui button teal">Submit</button>
                </form>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'editUserForm'
})(EditUserForm);

const mapStateToProps = (state) => {
    return {auth: state.auth, users: Object.values(state.users)};
}

export default connect(mapStateToProps, {editUser, fetchUserByEmail, signIn})(formWrapped);