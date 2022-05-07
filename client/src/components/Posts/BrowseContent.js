import React from 'react';
import { connect } from "react-redux";
import LinkButton from '../Buttons/LinkButton';

import BrowsePosts from './BrowsePosts';

import LolFilters from './LolFilters';
import DotaFilters from './DotaFilters';

import './posts.css'

class BrowseContent extends React.Component {

    componentDidMount() {

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

    renderFilters = game => {
        switch(game) {
            case 1:
                return <LolFilters key={this.props.game}/>
            case 2:
                return <DotaFilters key={this.props.game}/>
            default:
                return null
        }
    }

    renderCreatePostButton() {
        if (!this.props.user) return null
        if (!this.props.user.lolUser && this.gameId(this.props.game) === 1) return null
        if (!this.props.user.dotaUser && this.gameId(this.props.game) === 2) return null
        if (this.gameId(this.props.game) === 1 && this.props.user.lolUser.team && !this.props.user.teamOwned) return null
        if (this.gameId(this.props.game) === 2 && this.props.user.dotaUser.team && !this.props.user.teamOwned) return null
        return(
            <div>
                <LinkButton destination={`/create-post/${this.props.game}`} label='Create Post' class='fluid' id='cp-button'/>
            </div>
        )
    }

    render() {
        return(
            <div className='ui grid'>
                <div className='two columns row'>
                    <div className='four wide column'>
                        {this.renderCreatePostButton()}
                        <div className='left-content'>
                            {this.renderFilters(this.gameId(this.props.game))}
                        </div>
                    </div>
                    <div className='twelve wide column'>
                        <BrowsePosts key={this.props.game} gameId={this.gameId(this.props.game)}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { user: state.auth.user, game: ownProps.match.params.game }
}

export default connect(mapStateToProps)(BrowseContent);