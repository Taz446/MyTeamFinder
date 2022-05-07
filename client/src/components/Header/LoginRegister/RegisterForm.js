import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createUser, signIn} from '../../../actions';

import history from "../../../history";

import Country from './Country'

class RegisterForm extends React.Component {

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

    renderInput =  (formProps) => {
        const className=`field required ${this.submit === false && !this.error ? 'error' : ''}`;

        return (
            <div className={className}>
                { formProps.type === 'email' ? this.renderError() : null}
                <label>{formProps.label}</label>
                <input {...formProps.input} maxLength={formProps.maxLength} type={formProps.type} autoComplete="off" placeholder={`Enter your ${formProps.label}.`}/>
            </div>
        );
    }

    containsSpecialChars = (str) => {
        const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
        return specialChars.test(str);
    }

    onSubmit = async (formValues) => {
        if (!formValues.email || !formValues.displayName || !formValues.password || !formValues.repeatPassword) {
            this.submitFailed(null);
            return
        }
        if (!formValues.email.match(/^.*@.*\..*$/)) {
            this.submitFailed('Invalid email address.');
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
        if (5 > formValues.password.length || formValues.password.length > 13) {
            this.submitFailed('Password must be between 6-12 characters.');
            return
        }
        if (formValues.password !== formValues.repeatPassword) {
            this.submitFailed("Passwords don't match.");
            return
        }
        const user = {
            country: formValues.country,
            displayName: formValues.displayName,
            email: formValues.email.toLowerCase(),
            password: formValues.password,
            userType: 'USER'
        }
        try {
            await this.props.createUser(user);
        }catch(e) {
            if(e.message === "Request failed with status code 500") {
                this.submitFailed("Email already in use.");
            }
            return
        }
        const cUser = this.props.users.find(u => {return u.email === user.email.toLowerCase()});
        this.props.signIn(cUser);
        history.push('/');
    }

    render() {
        const className=`field ${this.submit === false && !this.error ? 'error' : ''}`;
        return (
            <div className="ui container">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" id="registerForm">
                    <Field name="email" component={this.renderInput} label="Email" type="email"/>
                    <Field name="displayName" maxLength={24} component={this.renderInput} label="Display name" type="text"/>
                    <Field name="password" maxLength={12} component={this.renderInput} label="Password" type="password"/>
                    <Field name="repeatPassword" maxLength={12} component={this.renderInput} label="Repeat Password" type="password"/>
                    <div className={className}>
                        <label>Country (optional)</label>
                        <Field name="country" component="select" label="Country">
                            <Country/>
                        </Field>
                    </div>
                    <button className="ui button teal">Submit</button>
                </form>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'register'
})(RegisterForm);

const mapStateToProps = (state) => {
    return {users: Object.values(state.users)};
}

export default connect(mapStateToProps, {createUser, signIn})(formWrapped);