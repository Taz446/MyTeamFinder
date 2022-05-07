import React from "react";
import {connect} from 'react-redux';
import {updateTeam, editUser, signIn, deleteTeam} from '../../../actions';
import rankTranslate from '../../UserProfile/LolProfile/LolRankTranslate';
import { Link } from 'react-router-dom';
import history from '../../../history';

import lolImg from '../../UserProfile/LolProfile/LolRankImage';

import '../../UserProfile/userProfile.css';
import '../team.css'

class TeamLolProfile extends React.Component {

    calibrateAvgRank() {
        let avgRank = 0;
        let count = 0
        this.props.players.forEach( p => {
            avgRank += rankTranslate(p.rank);
            count += 1;
        });
        avgRank = Math.round(avgRank/count);
        return rankTranslate(avgRank)
    }
    
    recalibrate = async () => {
        this.props.updateTeam(this.props.team.id, {...this.props.team, avgLolRank: this.calibrateAvgRank()})
    }

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

    renderLeaveTeamButton = () => {
        if(this.props.user.teamOwned) return null
        if(!this.props.user.lolUser) return null
        if(!this.props.user.lolUser.team) return null
        return(
            <button className="ui red mini button" onClick={this.leaveTeam}>Leave Team</button>
        )
    }

    leaveTeam = async () => {
        let check = true;
        try{
            await this.props.editUser(this.props.user.id, {...this.props.user, lolUser: {...this.props.user.lolUser, team: null}});
        }catch(e) {
            check = false
            console.log('error')
        }
        if(check) {
            this.props.signIn({...this.props.user, lolUser: {...this.props.user.lolUser, team: null}});
            history.push('/');
        } 
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
                            <button className="ui teal mini button" id="left-button" onClick={this.recalibrate}>recalibrate</button>
                            {this.renderLeaveTeamButton()}
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
    return {user: state.auth.user, teams: Object.values(state.users)};
}

export default connect(mapStateToProps, {updateTeam, editUser, signIn, deleteTeam})(TeamLolProfile);