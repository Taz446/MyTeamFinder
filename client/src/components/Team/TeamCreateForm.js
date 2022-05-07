import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { editUser, signIn, resetTeamInvites, resetTeamRequests, fetchUser } from '../../actions';

import mtf from '../../apis/mtf';

import LolRegion from '../UserProfile/LolProfile/LolRegion';

import history from "../../history";

class TeamCreateForm extends React.Component {

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
                { formProps.type === 'teamName' ? this.renderError() : null}
                <label>{formProps.label}</label>
                <input {...formProps.input} type={formProps.type} autoComplete="off" placeholder={`Enter your ${formProps.label}.`}/>
            </div>
        );
    }

    onSubmit = async (formValues) => {
        if (!formValues.teamName) {
            this.submitFailed(null);
            return
        }
        if (4 > formValues.teamName.length) {
            this.submitFailed('Your team name must be at least 4 characters long.');
            return
        }
        if (formValues.teamName.length > 16) {
            this.submitFailed('Your team name must be at most 16 characters long.');
            return 
        }
        const team = {
            teamName: formValues.teamName,
            lolRegion: formValues.region
        }
        let lUser = {}
        let dUser = {}
        let response = {};
        try {
            response = await mtf.post(`/teams/create/${this.props.user.id}`,team);
        }catch(e) {
            console.log('error team create')
            if(e.message === "Request failed with status code 500") {
                this.submitFailed("A team with that name already exists.");
            }
            return
        }
        
        await this.props.fetchUser(this.props.user.id);

        let cUser = {...this.props.users.find(u => {return u.id === this.props.user.id})}
        if (this.props.user.lolUser) {
            if(!this.props.user.lolUser.team) {
                lUser = {...this.props.user.lolUser, team: this.props.users.find(u => {return u.id === this.props.user.id}).teamOwned }
                cUser = {...cUser, lolUser: lUser}
            }
        }
        if (this.props.user.dotaUser) {
            if(!this.props.user.dotaUser.team) {
                dUser = {...this.props.user.dotaUser, team: this.props.users.find(u => {return u.id === this.props.user.id}).teamOwned }
                cUser = {...cUser, dotaUser: dUser}
            }
        }
        try{
            await this.props.editUser(this.props.user.id, cUser)
        }catch(e) {
            console.log('error')
            return
        }

        this.props.resetTeamInvites();
        this.props.resetTeamRequests();
        await this.props.signIn(this.props.users.find(u => {return u.id === this.props.user.id}))
        history.push('/');
    }

    render() {
        const className=`field ${this.submit === false && !this.error ? 'error' : ''}`;
        return (
            <div className="ui container">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <div className="ui grid">
                        <div className="two colum row">
                            <div className="twelve wide column">
                                <Field name="teamName" maxLength={16} component={this.renderInput} label="Team name" type="text"/>
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
    form: 'teamCreateForm'
})(TeamCreateForm);

const mapStateToProps = (state) => {
    return {user: state.auth.user, users: Object.values(state.users)};
}

export default connect(mapStateToProps, { editUser, signIn, resetTeamInvites, resetTeamRequests, fetchUser })(formWrapped);