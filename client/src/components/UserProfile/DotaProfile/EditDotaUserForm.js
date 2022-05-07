import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {editUser, signIn} from '../../../actions';

import dota from '../../../apis/openDotaApi';

import strint from './strint';

import history from '../../../history';

import '../userProfile.css';

class EditDotaUserForm extends React.Component {

    submitFailed = error => {
        this.submit = false;
        this.error = error;
    }

    renderInput =  (formProps) => {
        const className=`field required ${this.submit === false && !this.error ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} type={formProps.type} autoComplete="off" placeholder={`Enter your ${formProps.label}.`}/>
            </div>
        );
    }

    onSubmit = async (formValues) => {
        
        if (!formValues.steamId || isNaN(formValues.steamId)) {
            this.submitFailed(null);
            return
        }
        
        const steamId = strint().sub(formValues.steamId, "76561197960265728")

        let checkUser = true;
        let response;
        try{
            response = await dota.get(`/${steamId}`)
        }catch(e) {
            this.submitFailed(null);
            checkUser = false;
        }finally {
            if (!checkUser) {
                return
            }
        }
        
        const cUser = {...this.props.auth.user};
        cUser.dotaUser = {
            dotaId: steamId,
            dotaName: response.data.profile.personaname,
            soloMmr: response.data.solo_competitive_rank,
            partyMmr: response.data.competitive_rank,
            team: this.props.auth.user.teamOwned ? this.props.auth.user.teamOwned : null
        }
        try{
            await this.props.editUser(cUser.id, cUser);
        }catch(e) {
            this.submitFailed(null);
            return
        }
        this.props.signIn(this.props.users.find(u => {return u.id === this.props.auth.user.id}))
        history.goBack();
    }
    
    render() {
        return(
            <div className="ui container">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="steamId" component={this.renderInput} label="Steam id" type="text"/>
                    <div className="field">
                        You can visit <a href="https://steamcommunity.com/my">https://steamcommunity.com/my</a> to find your steam id. (It's the number at the end of the url after you log in to your account)
                    </div>
                    <button className="ui button teal">Submit</button>
                </form>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'editDotaUserForm'
})(EditDotaUserForm);

const mapStateToProps = (state) => {
    return {auth: state.auth, users: Object.values(state.users)};
}

export default connect(mapStateToProps, {editUser, signIn})(formWrapped);