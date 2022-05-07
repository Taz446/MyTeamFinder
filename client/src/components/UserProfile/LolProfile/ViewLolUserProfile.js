import React from "react";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTeamInvites, fetchTeamRequests } from "../../../actions";

import mtf from "../../../apis/mtf";

import lolImg from './LolRankImage';
import positionImage from '../../UserProfile/LolProfile/LolPositionImage';

import '../userProfile.css';

class ViewLolUserProfile extends React.Component {

    renderTeam() {
        if(this.props.user.lolUser.team) {
            return(
                <React.Fragment>
                    <span  style={{fontSize:"65%",fontWeight: "bold"}}>
                        <Link to={`/viewteam/${this.props.user.dotaUser.team.id}/${this.props.user.dotaUser.team.teamName}`} id="team-name">
                            _{this.props.user.lolUser.team.teamName}
                        </Link>
                    </span>
                </React.Fragment>
            )
        }
        return null
    }

    renderInviteButton() {
        if(!this.props.auth.user) return null
        if(!this.props.auth.user.teamOwned) return null
        if(this.props.user.lolUser.team) return null
        if(this.props.teamInvites.lolTeamInvites.find(i => {return i.lolUser.id === this.props.user.lolUser.id})) return null
        return <button className="ui teal mini button" onClick={this.invitePlayer}>Invite Player</button>
    }

    invitePlayer = async () => {
        try{
            await mtf.post(`/team-invites`, {type: 'INVITE', game: {id: 1}, team: this.props.auth.user.teamOwned, lolUser: this.props.user.lolUser, dotaUser: null})
        }catch(e) {
            console.log('error')
        }
        this.props.fetchTeamInvites(this.props.auth.user);
        this.props.fetchTeamRequests(this.props.auth.user);
    }

    renderPrefPostions() {
        const pos = [];
        if(this.props.user.lolUser.top) pos.push('top')
        if(this.props.user.lolUser.jungle) pos.push('jungle')
        if(this.props.user.lolUser.mid) pos.push('mid')
        if(this.props.user.lolUser.bottom) pos.push('bottom')
        if(this.props.user.lolUser.support) pos.push('support')
        return pos.map( p => {
            return(
                <div className='field' key={p}>
                    <img src={positionImage(p)} alt={p} className='ui mini image position-image'/>
                </div>
            )
        })
    }

    render() {
        if (!this.props.user.lolUser) {
            return(
                <div id="game-button">
                    No LoL account connected
                </div>
            );
        }
        return(
            <div className="ui container">
                <div className="ui grid">
                    <div className="three column row">
                        <div className="six wide column">
                            <div className="user-game-name"><b>{this.props.user.lolUser.summonerName}</b>&nbsp;&nbsp;{this.renderTeam()}</div>
                            <div className="user-email">
                                <b>{this.props.user.lolUser.rank}&nbsp;&nbsp;&nbsp;{this.props.user.lolUser.lolRegion}</b> 
                            </div>
                            {this.renderInviteButton()}
                            <div className='field inline' id='pref-positions'>
                                {this.renderPrefPostions()}
                            </div>
                        </div>
                        <div className="seven wide column">
                            <div className="ui cards" style={{marginTop:"1%"}}>
                                <div className="card">
                                    <div className="content">
                                        <div className="center aligned header">My Experience</div>
                                        <div className="description">
                                            {this.props.user.lolUser.lolExp}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="three wide column" id="game-rank">
                            <img src={lolImg(this.props.user.lolUser.rank)} alt="rank"></img>
                        </div>
                    </div>
                </div> 
            </div>
    )}; 
}

const mapStateToProps = (state) => {
    return {auth: state.auth, teamInvites: state.teamInvites};
}

export default connect(mapStateToProps, {fetchTeamInvites, fetchTeamRequests})(ViewLolUserProfile);