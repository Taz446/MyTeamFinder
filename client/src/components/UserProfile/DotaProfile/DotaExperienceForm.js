import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {editUser} from '../../../actions';

import history from '../../../history';

import '../userProfile.css';

import positionImage from '../../UserProfile/LolProfile/LolPositionImage';

class DotaExperienceForm extends React.Component {

    renderInput =  (formProps) => {
        return (
            <div className="field">
                <input {...formProps.input} type={formProps.type} autoComplete="off" placeholder={`Enter your ${formProps.label}.`}/>
            </div>
        );
    }

    onSubmit = async (formValues) => {
        const user = this.props.auth.user;
        user.dotaUser.dotaExp = formValues.dotaExp ? formValues.dotaExp : this.props.auth.user.dotaUser.dotaExp
        user.dotaUser.carry = !formValues.carry ? false : formValues.carry
        user.dotaUser.mid2 = !formValues.mid2 ? false : formValues.mid2
        user.dotaUser.offlane = !formValues.offlane ? false : formValues.offlane
        user.dotaUser.farmSupport = !formValues.farmSupport ? false : formValues.farmSupport
        user.dotaUser.hardSupport = !formValues.hardSupport ? false : formValues.hardSupport
        try{
            await this.props.editUser(user.id, user);
        }catch(e){
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
                    <Field name="dotaExp" component={this.renderInput} label="Dota Experience" type="text"/>
                    <label className="positions">
                        <b>Roles</b>
                    </label> 
                    <div className='inline fields positions'>
                        <Field name="carry" component={this.renderPosInput} label="Carry" type="checkbox"/>
                        <Field name="mid2" component={this.renderPosInput} label="Mid2" type="checkbox"/>
                        <Field name="offlane" component={this.renderPosInput} label="Offlane" type="checkbox"/>
                        <Field name="farmSupport" component={this.renderPosInput} label="FarmSupport" type="checkbox"/>
                        <Field name="hardSupport" component={this.renderPosInput} label="HardSupport" type="checkbox"/>
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
    form: 'dotaExperienceForm'
})(DotaExperienceForm);

const mapStateToProps = (state) => {
    return {auth: state.auth};
}

export default connect(mapStateToProps, {editUser})(formWrapped);