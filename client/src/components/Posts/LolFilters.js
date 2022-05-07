import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import { setFilters, resetFilters, fetchPosts, resetPosts } from '../../actions';

import './posts.css'

import { Button } from 'semantic-ui-react'
import LolRegion from '../UserProfile/LolProfile/LolRegion';
import LolRanks from '../UserProfile/LolProfile/LolRanks';

import positionImage from '../UserProfile/LolProfile/LolPositionImage';

class LolFilters extends React.Component {
    
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
        this.props.resetFilters()
        this.props.setFilters(this.newFilters);
        this.props.resetPosts();
        this.props.fetchPosts(1, (this.teams ? 'TEAM' : 'PLAYER'));
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
                    
                    <div className='field'>
                        <div className='positions'>
                            <label>Region</label>
                        </div>
                        <Field name="region" component="select" label="Region">
                            <LolRegion/>
                        </Field>
                    </div>
                    <div className='field'>
                        <div className='positions'>
                            <label>Min Rank</label>
                        </div>
                        <Field name="minRank" component="select" label="Min Rank">
                            <LolRanks value="0"/>
                        </Field>
                    </div>
                    <div className='field'>
                        <div className='positions'>
                            <label>Max Rank</label>
                        </div>
                        <Field name="maxRank" component="select" label="Max Rank">
                            <LolRanks value="100"/>
                        </Field>
                    </div>
                    <div className='positions'>
                        <label><b>Roles</b></label>                  
                    </div>
                    <div className='inline fields'>
                        <Field name="top" component={this.renderInput} label="Top" type="checkbox"/>
                        <Field name="jungle" component={this.renderInput} label="Top" type="checkbox"/>
                        <Field name="mid" component={this.renderInput} label="Top" type="checkbox"/>
                        <Field name="bottom" component={this.renderInput} label="Top" type="checkbox"/>
                        <Field name="support" component={this.renderInput} label="Top" type="checkbox"/>
                    </div>
                    <div className="column row">
                        <div className='field inline' id='filters-button'>
                            <button className="ui button teal right floated fluid">Apply Filters</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'lolFiltersForm'
})(LolFilters);

const mapStateToProps = (state) => {
    return {auth: state.auth, users: Object.values(state.users), filters: state.filters};
}

export default connect(mapStateToProps, { setFilters, resetFilters, fetchPosts, resetPosts })(formWrapped);