import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {editUser} from '../../../actions';

import history from '../../../history';

import '../userProfile.css';

import positionImage from '../../UserProfile/LolProfile/LolPositionImage';

class LolExperienceForm extends React.Component {

    renderInput =  (formProps) => {
        return (
            <div className="field">
                <input {...formProps.input} type={formProps.type} autoComplete="off" placeholder={`Enter your ${formProps.label}.`}/>
            </div>
        );
    }

    onSubmit = async (formValues) => {
        const user = this.props.auth.user;
        user.lolUser.lolExp = formValues.lolExp;
        user.lolUser.top = !formValues.top ? false : formValues.top
        user.lolUser.jungle = !formValues.jungle ? false : formValues.jungle
        user.lolUser.mid = !formValues.mid ? false : formValues.mid
        user.lolUser.bottom = !formValues.bottom ? false : formValues.bottom
        user.lolUser.support = !formValues.support ? false : formValues.support
        try{
            await this.props.editUser(user.id, user);
        }catch(e){
            console.log('error')
            return
        }
        history.goBack();
    }

    renderPosInput =  (formProps) => {
        return (
            <div>
                <div className='field positions'>
                    <img src={positionImage(formProps.input.name)} alt={formProps.input.name} className='position-image'/>
                </div>
                <div className='field positions row'>
                    <input {...formProps.input} type={formProps.type}/>
                </div>
            </div>
        );
    }
    
    render() {
        return(
            <div className="ui container">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                    <label className="positions"><b>LoL Experience</b></label>
                    <Field name="lolExp" component={this.renderInput} label="LoL Experience" type="text"/>
                    <label className="positions">
                        <b>Roles</b>
                    </label> 
                    <div className='inline fields positions'>
                        <Field name="top" component={this.renderPosInput} label="Top" type="checkbox"/>
                        <Field name="jungle" component={this.renderPosInput} label="Top" type="checkbox"/>
                        <Field name="mid" component={this.renderPosInput} label="Top" type="checkbox"/>
                        <Field name="bottom" component={this.renderPosInput} label="Top" type="checkbox"/>
                        <Field name="support" component={this.renderPosInput} label="Top" type="checkbox"/>
                    </div>
                    <div className="positions">
                        <button className="ui button teal">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'lolExperienceForm'
})(LolExperienceForm);

const mapStateToProps = (state) => {
    return {auth: state.auth};
}

export default connect(mapStateToProps, {editUser})(formWrapped);