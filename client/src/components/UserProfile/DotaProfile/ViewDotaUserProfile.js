import React from "react";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTeamInvites, fetchTeamRequests } from "../../../actions";

import mtf from "../../../apis/mtf";

import dotaImg from './DotaRankImage';
import positionImage from '../../UserProfile/LolProfile/LolPositionImage';

import '../userProfile.css';

class ViewDotaUserProfile extends React.Component {

    renderTeam() {
        if(this.props.user.dotaUser.team) {
            return(
                <React.Fragment>
                    <span  style={{fontSize:"65%",fontWeight: "bold"}}>
                        <Link to={`/viewteam/${this.props.user.dotaUser.team.id}/${this.props.user.dotaUser.team.teamName}`} id="team-name">
                            _{this.props.user.dotaUser.team.teamName}
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
        if(this.props.user.dotaUser.team) return null
        if(this.props.teamInvites.dotaTeamInvites.find(i => {return i.dotaUser.id === this.props.user.dotaUser.id})) return null
        return <button className="ui teal mini button" onClick={this.invitePlayer}>Invite Player</button>
    }

    invitePlayer = async() => {
        try{
            await mtf.post(`/team-invites`, {type: 'INVITE', game: {id: 2}, team: this.props.auth.user.teamOwned, lolUser: null, dotaUser: this.props.user.dotaUser})
        }catch(e) {
            console.log('error')
        }
        this.props.fetchTeamInvites(this.props.auth.user);
        this.props.fetchTeamRequests(this.props.auth.user);
    }

    renderPrefPostions() {
        const pos = [];
        if(this.props.user.dotaUser.carry) pos.push('carry')
        if(this.props.user.dotaUser.mid2) pos.push('mid2')
        if(this.props.user.dotaUser.offlane) pos.push('offlane')
        if(this.props.user.dotaUser.farmSupport) pos.push('farmSupport')
        if(this.props.user.dotaUser.hardSupport) pos.push('hardSupport')
        return pos.map( p => {
            return(
                <div className='field' key={p}>
                    <img src={positionImage(p)} alt={p} className='ui mini image position-image'/>
                </div>
            )
        })
    }

    render() {
        if (!this.props.user.dotaUser) {
            return(
                <div id="game-button">
                    No Dota2 account connected
                </div>
            );
        }
        return(
            <div className="ui container">
                <div className="ui grid">
                    <div className="three column row">
                        <div className="six wide column">
                            <div className="user-game-name"><b>{this.props.user.dotaUser.dotaName}</b>&nbsp;&nbsp;{this.renderTeam()}</div>
                            <div className="user-email">
                                <b>solo: {this.props.user.dotaUser.soloMmr}&nbsp;&nbsp;&nbsp;party: {this.props.user.dotaUser.partyMmr}&nbsp;&nbsp;&nbsp;{this.props.user.dotaUser.team ? this.props.user.dotaUser.team.name : ''}</b>
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
                                            {this.props.user.dotaUser.dotaExp}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="three wide column" id="game-rank">
                            <img src={dotaImg(this.props.user.dotaUser.soloMmr)} alt="rank"></img>
                        </div>
                    </div>
                </div> 
            </div>
    )}; 
}

const mapStateToProps = (state) => {
    return {auth: state.auth, teamInvites: state.teamInvites};
}

export default connect(mapStateToProps, {fetchTeamInvites, fetchTeamRequests})(ViewDotaUserProfile);