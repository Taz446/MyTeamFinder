import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import {changePassword, fetchUserByEmail, signIn} from '../../actions';

import history from "../../history";

import mtf from '../../apis/mtf';

class PasswordChangeForm extends React.Component  {

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

    onSubmit = async (formValues) => {
        console.log(formValues);
        if (!formValues.oldPassword || !formValues.newPassword || !formValues.repeatNewPassword) {
            this.submitFailed(null);
            return
        }
        if (5 > formValues.newPassword.length || formValues.newPassword.length > 13) {
            this.submitFailed('Password must be between 6-12 characters.');
            return
        }
        if (formValues.newPassword !== formValues.repeatNewPassword) {
            this.submitFailed("Passwords don't match.");
            return
        }
        const checkPassword = await mtf.post(`/users/password-compare/${this.props.auth.user.id}`, {
            password: formValues.oldPassword
        })
        if (checkPassword.data) {
            await this.props.changePassword(this.props.auth.user.id, formValues.newPassword);
            const cUser = this.props.users.find(u => {return u.email === this.props.auth.user.email.toLowerCase()});
            this.props.signIn(cUser);
            history.push(`/profile/${cUser.id}/${formValues.displayName}`);
        } else {
            this.submitFailed("Wrong Password.");
            return
        }
    }

    renderInput =  (formProps) => {
        const className=`field required ${this.submit === false && !this.error ? 'error' : ''}`;

        return (
            <div className={className}>
                { formProps.input.name === 'oldPassword' ? this.renderError() : null}
                <label>{formProps.label}</label>
                <input {...formProps.input} type={formProps.type} autoComplete="off" placeholder={formProps.input.name === "repeatNewPassword" ? "Repeat your New Password" : `Enter your ${formProps.label}.`}/>
            </div>
        );
    }
    
    render() {
        return(
            <div className="ui container">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="oldPassword" component={this.renderInput} label="Old Password" type="password"/>
                    <Field name="newPassword" component={this.renderInput} label="New Password" type="password"/>
                    <Field name="repeatNewPassword" component={this.renderInput} label="Repeat New Password" type="password"/>
                    <button className="ui button teal">Submit</button>
                </form>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'passwordChangeForm'
})(PasswordChangeForm);

const mapStateToProps = (state) => {
    return {auth: state.auth, users: Object.values(state.users)};
}

export default connect(mapStateToProps, {changePassword, fetchUserByEmail, signIn})(formWrapped);