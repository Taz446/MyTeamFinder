import React from "react";
import {connect} from 'react-redux';
import { fetchTeamInvites, fetchTeamRequests } from "../../../actions";
import { Link } from 'react-router-dom';

import mtf from "../../../apis/mtf";

import dotaImg from '../../UserProfile/DotaProfile/DotaRankImage';

import '../../UserProfile/userProfile.css';
import '../team.css'

class ViewTeamDotaProfile extends React.Component {

    renderPlayers() {
        return(this.props.players.map(p => {
            return(
                <div key={p.id, p.dotaName} className="players">
                    <h5 className="ui top attached header">
                        <Link to={`/viewdotaprofile/${p.id}`} className="team-name">
                            <i className="user icon right floated"></i>
                            {p.dotaName}
                        </Link>
                    </h5>
                    <div className="ui attached segment">
                        <div className="ui grid">
                            <div className="two columns row">
                                <div className="eight wide column">
                                    solo: {p.soloMmr}
                                </div>
                                <div className="eight wide column rlp">
                                    party: {p.partyMmr}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }))
    }

    renderRequestJoin() {
        if(!this.props.user) return null
        if(!this.props.user.dotaUser) return null
        if(this.props.user.dotaUser.team) return null
        if(this.props.teamRequests.dotaTeamRequests.find(r => {return r.team.id === this.props.team.id})) return null
        return <button className="ui teal mini button" id="left-button" onClick={this.joinRequest}>Join Request</button>
    }

    joinRequest = async () => {
        try{
            await mtf.post(`/team-invites`, {type: 'REQUEST', game: {id: 2}, team: this.props.team, lolUser: null, dotaUser: this.props.user.dotaUser})
        }catch(e) {
            console.log('error')
        }
        this.props.fetchTeamInvites(this.props.user);
        this.props.fetchTeamRequests(this.props.user);
    }

    render() {
        return(
            <div className="ui container">
                <div className="ui grid">
                    <div className="three column row">
                        <div className="four wide column">
                            <div className="user-game-name"><b>{this.props.team.teamName}</b></div>
                            <div className="user-email">
                                <b>{this.props.team.avgDotaMmr}&nbsp;</b>
                            </div>
                            {this.renderRequestJoin()}
                        </div>
                        <div className="nine wide column">
                            <h1>PLAYERS</h1>
                            {this.renderPlayers()}
                        </div>
                        <div className="three wide column" id="game-rank">
                            <img src={dotaImg(this.props.team.avgDotaMmr)} alt="rank"></img>
                        </div>
                    </div>
                </div> 
            </div>
    )}; 
}

const mapStateToProps = (state) => {
    return {user: state.auth.user, teamRequests: state.teamRequests};
}

export default connect(mapStateToProps,{fetchTeamInvites, fetchTeamRequests})(ViewTeamDotaProfile);