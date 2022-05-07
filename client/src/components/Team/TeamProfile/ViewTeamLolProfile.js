import React from "react";
import {connect} from 'react-redux';
import { fetchTeamInvites, fetchTeamRequests } from "../../../actions";
import { Link } from 'react-router-dom';

import mtf from "../../../apis/mtf";

import lolImg from '../../UserProfile/LolProfile/LolRankImage';

import '../../UserProfile/userProfile.css';
import '../team.css'

class ViewTeamLolProfile extends React.Component {

    renderPlayers() {
        return(this.props.players.map(p => {
            return(
                <div key={p.id, p.summonerName} className="players">
                    <h5 className="ui top attached header">
                        <Link to={`/viewlolprofile/${p.id}`} className="team-name">
                            <i className="user icon right floated"></i>
                            {p.summonerName}
                        </Link>
                    </h5>
                    <div className="ui attached segment">
                        <div className="ui grid">
                            <div className="two columns row">
                                <div className="eight wide column">
                                    {p.rank}
                                </div>
                                <div className="eight wide column rlp">
                                    {p.lolRegion}
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
        if(!this.props.user.lolUser) return null
        if(this.props.user.lolUser.team) return null
        if(this.props.teamRequests.lolTeamRequests.find(r => {return r.team.id === this.props.team.id})) return null
        return <button className="ui teal mini button" id="left-button" onClick={this.joinRequest}>Join Request</button>
    }

    joinRequest = async () => {
        try{
            await mtf.post(`/team-invites`, {type: 'REQUEST', game: {id: 1}, team: this.props.team, lolUser: this.props.user.lolUser, dotaUser: null})
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
                                <b>{this.props.team.avgLolRank}&nbsp;&nbsp;&nbsp;{this.props.team.lolRegion}</b>
                            </div>
                            {this.renderRequestJoin()}
                        </div>
                        <div className="nine wide column">
                            <h1>PLAYERS</h1>
                            {this.renderPlayers()}
                        </div>
                        <div className="three wide column" id="game-rank">
                            <img src={lolImg(this.props.team.avgLolRank)} alt="rank"></img>
                        </div>
                    </div>
                </div> 
            </div>
    )}; 
}

const mapStateToProps = (state) => {
    return {user: state.auth.user, teamRequests: state.teamRequests};
}

export default connect(mapStateToProps, {fetchTeamInvites, fetchTeamRequests})(ViewTeamLolProfile);