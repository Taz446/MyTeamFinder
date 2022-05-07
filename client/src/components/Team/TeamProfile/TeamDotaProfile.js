import React from "react";
import {connect} from 'react-redux';
import {updateTeam, editUser, signIn} from '../../../actions';
import { Link } from 'react-router-dom';
import history from '../../../history';

import dotaImg from '../../UserProfile/DotaProfile/DotaRankImage';

import '../../UserProfile/userProfile.css';
import '../team.css'

class TeamDotaProfile extends React.Component {
    calibrateAvgRank() {
        let avgMmr = 0;
        let count = 0
        this.props.players.forEach( p => {
            avgMmr += p.soloMmr;
            count += 1;
        });
        avgMmr = Math.round(avgMmr/count);
        return avgMmr
    }
    
    recalibrate = async () => {
        this.props.updateTeam(this.props.team.id, {...this.props.team, avgDotaMmr: this.calibrateAvgRank()})
    }

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

    renderLeaveTeamButton = () => {
        if(this.props.user.teamOwned) return null
        if(!this.props.user.dotaUser) return null
        if(!this.props.user.dotaUser.team) return null
        return(
            <button className="ui red mini button" onClick={this.leaveTeam}>Leave Team</button>
        )
    }

    leaveTeam = async () => {
        let check = true;
        try{
            await this.props.editUser(this.props.user.id, {...this.props.user, dotaUser: {...this.props.user.dotaUser, team: null}});
        }catch(e) {
            check = false
            console.log('error')
        }
        
        if(check) {
            this.props.signIn({...this.props.user, dotaUser: {...this.props.user.dotaUser, team: null}});
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
                                <b>{this.props.team.avgDotaMmr}&nbsp;</b>
                            </div>
                            <button className="ui teal mini button" id="left-button" onClick={this.recalibrate}>recalibrate</button>
                            {this.renderLeaveTeamButton()}
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
    return {user: state.auth.user, teams: Object.values(state.users)};
}

export default connect(mapStateToProps, {updateTeam, editUser, signIn})(TeamDotaProfile);