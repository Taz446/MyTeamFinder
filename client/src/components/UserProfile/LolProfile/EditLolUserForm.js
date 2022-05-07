import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {editUser, signIn} from '../../../actions';
import axios from "axios";

import { lolApiKey } from '../../../secrets/keys';

import LolRegion from './LolRegion';

import history from '../../../history';

import '../userProfile.css';

class EditLolUserForm extends React.Component {

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
                {this.renderError()}
                <label>{formProps.label}</label>
                <input {...formProps.input} type={formProps.type} autoComplete="off" placeholder={`Enter your ${formProps.label}.`}/>
            </div>
        );
    }

    onSubmit = async (formValues) => {
        if (!formValues.summonerName || !formValues.region) {
            this.submitFailed(null);
            return
        }
        let checkUser = true;
        let response;
        try{
            response = await axios.get(`https://${formValues.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${formValues.summonerName}?api_key=${lolApiKey}`);
        }catch(e) {
            this.submitFailed(null);
            checkUser = false;
        }finally {
            if (!checkUser) {
                return
            }
        }
        const lolUserRanked = await axios.get(`https://${formValues.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${response.data.id}?api_key=${lolApiKey}`);
        const lolUser = lolUserRanked.data.find(u => {return u.queueType === "RANKED_SOLO_5x5"});
        const cUser = {...this.props.auth.user};
        cUser.lolUser = {
            lolId: response.data.id,
            summonerName: response.data.name,
            rank: (lolUser ? `${lolUser.tier}_${lolUser.rank}` : null),
            lolRegion: formValues.region
        }
        try{
            await this.props.editUser(this.props.auth.user.id, cUser);
        }catch(e) {
            this.submitFailed(null);
            return
        }
        this.props.signIn(this.props.users.find(u => {return u.id === this.props.auth.user.id}))
        history.goBack();
    }
    
    render() {
        const className=`field required ${this.submit === false && !this.error ? 'error' : ''}`;
        return(
            <div className="ui container">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <div className="ui grid">
                        <div className="two colum row">
                            <div className="twelve wide column">
                                <Field name="summonerName" component={this.renderInput} label="Summoner Name" type="text"/>
                            </div>
                            <div className="four wide column">
                                <div className={className}>
                                    <label>Region</label>
                                    <Field name="region" component="select" label="Region">
                                        <LolRegion/>
                                    </Field>
                                </div>
                            </div>
                        </div>
                        <div className="column row" id="game-button">
                            <button className="ui button teal">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'editLolUserForm'
})(EditLolUserForm);

const mapStateToProps = (state) => {
    return {auth: state.auth, users: Object.values(state.users)};
}

export default connect(mapStateToProps, {editUser, signIn})(formWrapped);