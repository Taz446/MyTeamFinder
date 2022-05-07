import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'

import {signIn, fetchUserByEmail, fetchTeamInvites, fetchTeamRequests} from '../../../actions';

import history from "../../../history";
import GoogleAuth from "../../Buttons/GoogleAuth";
import LinkButton from '../../Buttons/LinkButton';

import './LoginRegister.css';

import mtf from "../../../apis/mtf";

class LoginForm extends React.Component {

    submitFailed = error => {
        this.submit = false;
        this.error = error;
    }

    onSubmit = async (formValues) => {
        if (!formValues.email || !formValues.password) {
            this.submitFailed(null);
            return
        }
        if (!formValues.email.match(/^.*@.*\..*$/)) {
            this.submitFailed('Invalid email address.');
            return
        }
        try {
            await this.props.fetchUserByEmail(formValues.email);
        }catch(e){
            this.submitFailed("User doesn't exist.");
            return
        }
        const cUser = this.props.users.find(u => {return u.email === formValues.email.toLowerCase()});
        const checkPassword = await mtf.post(`/users/password-compare/${cUser.id}`,{
            "password": formValues.password
        });
        if (checkPassword.data) {
            this.props.fetchTeamInvites(cUser);
            this.props.fetchTeamRequests(cUser);
            this.props.signIn(cUser);
            history.push('/');
        } else {
            this.submitFailed('Wrong password.');
        }
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
        const className=`field ${this.submit === false && !this.error ? 'error' : ''}`;

        return (
            <div className={className}>
                { formProps.type === 'email' ? this.renderError() : null}
                <label>{formProps.label}</label>
                <input {...formProps.input} type={formProps.type} autoComplete="off" placeholder={`Enter your ${formProps.label}.`}/>
            </div>
        );
    }

    render() {
        return(
            <div className="ui container">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="email" component={this.renderInput} label="Email" type="email"/>
                    <Field name="password" maxLength={12} component={this.renderInput} label="Password" type="password"/> 

                    <div className="ui grid">
                        <div className="eight wide column">
                            <button className="ui button teal">Submit</button>
                            <GoogleAuth gAuth={this.props.gAuth}/>
                        </div>
                        <div className="eight wide column" id="register-text">
                            <b>Don't have an account?&nbsp;&nbsp;&nbsp;You can sign up here:</b>
                            <LinkButton destination="/register" label="Register" floated="right"/>
                         </div>
                    </div>
                    
                    
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { users: Object.values(state.users)};
};

const formWrapped = reduxForm({
    form: 'login'
})(LoginForm);

export default connect(mapStateToProps, {signIn, fetchUserByEmail, fetchTeamInvites, fetchTeamRequests})(formWrapped);