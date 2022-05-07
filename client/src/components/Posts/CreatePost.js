import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { createPost, resetPosts } from '../../actions';

import rankTranslate from '../UserProfile/LolProfile/LolRankTranslate';
import Denied from '../Utility/Denied';
import history from "../../history";

import './posts.css'

import positionImage from '../UserProfile/LolProfile/LolPositionImage';

class CreatePost extends React.Component {

    onSubmit = async formValues => {
        if(!formValues.content) return this.submitFailed(null)
        const post = { content: formValues.content}
        post.user = this.props.user;
        post.game = { id: this.gameId(this.props.game) }
        post.postType = this.props.user.teamOwned ? 'TEAM' : 'PLAYER'
        if (this.gameId(this.props.game) === 1) {
            delete formValues.content;
            post.lolFilters = {...formValues}
        }
        if (this.gameId(this.props.game) === 2) {
            delete formValues.content;
            post.dotaFilters = {...formValues}
        }
        if (this.gameId(this.props.game) === 1) {
            if (this.props.user.teamOwned) {
                post.lolFilters.rank = rankTranslate(this.props.user.teamOwned.avgLolRank)
                post.lolFilters.region = this.props.user.teamOwned.lolRegion
            }else {
                post.lolFilters.rank = this.props.user.lolUser.rankLevel
                post.lolFilters.region = this.props.user.lolUser.lolRegion
            }
        }
        if (this.gameId(this.props.game) === 2) {
            if (this.props.user.teamOwned) {
                post.dotaFilters.mmr = this.props.user.teamOwned.avgDotaMmr
            }else {
                post.dotaFilters.mmr = this.props.user.dotaUser.soloMmr
            }
        }

        await this.props.createPost(post);
        await this.props.resetPosts();
        history.goBack();
    }

    submitFailed = error => {
        this.submit = false;
        this.error = error;
    }

    renderInput =  (formProps) => {
        if(this.gameId(this.props.game) === 1) {
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
        return (
            <div>
                <div className='field positions'>
                    <img src={positionImage(formProps.input.name)} alt={formProps.input.name} className='position-image'/>
                </div>
                <div className='field positions row'>
                    <input style={{margin: "1px"}} {...formProps.input} type={formProps.type}/>
                </div>
            </div>
        );
    }

    renderContentField = formProps => {
        return(
            <div className={`field positions row ${this.submit === false && !this.error ? 'error' : ''}`}>
                <input maxLength={90} {...formProps.input} type={formProps.type}/>
            </div>
        )
    }

    renderPositions() {
        if(this.gameId(this.props.game) === 1) {
            return(
                <div className='inline fields positions'>
                    <Field name="top" component={this.renderInput} label="Top" type="checkbox"/>
                    <Field name="jungle" component={this.renderInput} label="Jungle" type="checkbox"/>
                    <Field name="mid" component={this.renderInput} label="Mid" type="checkbox"/>
                    <Field name="bottom" component={this.renderInput} label="Bottom" type="checkbox"/>
                    <Field name="support" component={this.renderInput} label="Support" type="checkbox"/>
                </div>
            )
        }
        return(
            <div className='inline fields positions'>
                <Field name="carry" component={this.renderInput} label="#1" type="checkbox"/>
                <Field name="mid2" component={this.renderInput} label="#2" type="checkbox"/>
                <Field name="offlane" component={this.renderInput} label="#3" type="checkbox"/>
                <Field name="farmSupport" component={this.renderInput} label="#4" type="checkbox"/>
                <Field name="hardSupport" component={this.renderInput} label="#5" type="checkbox"/>
            </div>
        )
    }

    gameId = game => {
        switch(game) {
            case "league-of-legends":
                return 1
            case "dota2":
                return 2
            default:
                return null
        }
    }

    render() {
        if(!this.props.user)  {
            return(
                <Denied/>
            )
        }
        if(!this.props.user.lolUser && this.gameId(this.props.game) === 1) {
            return(
                <Denied/>
            )
        } 
        if(!this.props.user.dotaUser && this.gameId(this.props.game) === 2) {
            return(
                <Denied/>
            )
        } 
        return(
            <div className="ui container" style={{marginTop: "10%"}}>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <div className='field'>
                        <div className="positions">
                            <label><b>Content</b></label>                    
                        </div>
                        <Field name="content" component={this.renderContentField} label="Content" type="text"/>
                    </div>
                    <div className="positions">
                        <label><b>Roles</b></label>
                    </div>
                    {this.renderPositions()}
                    <div className="column row">
                        <div className='field inline' id='filters-button'>
                            <button className="ui button teal right floated fluid">Post Now!</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const formWrapped = reduxForm({
    form: 'createPostForm'
})(CreatePost);

const mapStateToProps = (state, ownProps) => {
    return {user: state.auth.user, game: ownProps.match.params.tag};
}

export default connect(mapStateToProps, {createPost, resetPosts})(formWrapped);