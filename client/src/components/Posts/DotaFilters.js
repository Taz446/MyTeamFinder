import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import { setFilters, resetFilters, fetchPosts, resetPosts } from '../../actions';

import './posts.css'

import { Button } from 'semantic-ui-react'

import positionImage from '../UserProfile/LolProfile/LolPositionImage';

class DotaFilters extends React.Component {

    constructor(props) {
        super(props);
        this.newFilters = {}
        this.teams = true
        this.players = false
        this.state = {
          teamsActive: null,
          playersActive: null
        }
    }

    componentDidMount() {
        this.props.setFilters(this.newFilters);
        this.setState({teamsActive: true})
        this.setState({playersActive: false})
    }

    componentDidUpdate() {
        this.teams = this.state.teamsActive
        this.players = this.state.playersActive
    }
    
    handleClickTeams = (active) =>{
        if(active) return
            this.setState((prevState) => ({ teamsActive: !prevState.teamsActive, playersActive: !prevState.playersActive }))
    }

    handleClickPlayers = (active) =>{
        if(active) return
            this.setState((prevState) => ({ teamsActive: !prevState.teamsActive, playersActive: !prevState.playersActive }))
    }

    onSubmit = formValues => {
        this.newFilters = {...formValues}
        this.props.resetFilters();
        this.props.setFilters(this.newFilters);
        this.props.resetPosts();
        this.props.fetchPosts(2, (this.teams ? 'TEAM' : 'PLAYER'));
    }

    renderInput =  (formProps) => {
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

    renderMmrInput =  (formProps) => {
        return (
            <div className="field">
                <div className='positions'>
                    <label>{formProps.label}</label>
                </div>
                <input {...formProps.input} type={formProps.type} autoComplete="off" placeholder={`Set ${formProps.label}.`}/>
            </div>
        );
    }

    render() {
        return(
            <div className="ui container">
                <div className='field type-buttons'>
                    <div className='ui grid'>
                        <div className='two column row'>
                            <div className='column'>
                                <Button toggle active={this.state.teamsActive} onClick={() => {this.handleClickTeams(this.state.teamsActive)}} className='fluid'>Teams</Button>
                            </div>
                            <div className='column'>
                                <Button toggle active={this.state.playersActive} onClick={() => {this.handleClickPlayers(this.state.playersActive)}} className="right floated fluid">Players</Button>
                            </div>
                        </div>
                    </div>   
                </div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui inverted form">
                <Field name="minMmr" component={this.renderMmrInput} label="Minimum mmr" type="number"/>
                <Field name="maxMmr" component={this.renderMmrInput} label="Maximum mmr" type="number"/>
                    <div className='positions'>
                        <label>
                            <b>Roles</b>
                        </label>                     
                    </div>
                    <div className='inline fields'>
                        <Field name="carry" component={this.renderInput} label="#1" type="checkbox"/>
                        <Field name="mid2" component={this.renderInput} label="#2" type="checkbox"/>
                        <Field name="offlane" component={this.renderInput} label="#3" type="checkbox"/>
                        <Field name="farmSupport" component={this.renderInput} label="#4" type="checkbox"/>
                        <Field name="hardSupport" component={this.renderInput} label="#5" type="checkbox"/>
                    </div>
                    <div className="column row" id='filters-button'>
                        <button className="ui button teal fluid">Apply Filters</button>
                    </div>
                </form>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'dotaFiltersForm'
})(DotaFilters);

const mapStateToProps = (state) => {
    return {auth: state.auth, users: Object.values(state.users), filters: state.filters };
}

export default connect(mapStateToProps, {setFilters, resetFilters, fetchPosts, resetPosts})(formWrapped);