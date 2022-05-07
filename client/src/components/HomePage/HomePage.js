import React from "react";
import { connect } from "react-redux";
import { getRecommendations, resetRecommendations } from "../../actions";
import { isEmpty } from "lodash";
import { Link } from 'react-router-dom';

import lol from '../../resources/images/lol.png';
import dota2 from '../../resources/images/dota2.png';
import lolDota from '../../resources/images/lolDota.png';

class HomePage extends React.Component{

    componentDidMount() {
        this.props.resetRecommendations()
    }

    renderRecButton(teams) {
        if(teams.lolTeam) {
            if(teams.lolTeam.game === 0) {
                return(
                    <button className="ui button huge teal" onClick={this.getTeamRecommendation}>Get a team recommendation!</button>
                )
            }
        }
        if(teams.dotaTeam) {
            if(teams.dotaTeam.game === 0) {
                return(
                    <button className="ui button huge teal" onClick={this.getTeamRecommendation}>Get a team recommendation!</button>
                )
            }
        }
        return null
    }

    getTeamRecommendation = async () => {
        this.props.getRecommendations(this.props.user.id);
    }

    getTeams() {
        let teams = {lolTeam: null, dotaTeam: null}
        const user = {...this.props.user}

        if(user.lolUser) {
            if(user.lolUser.team) {
                teams = {...teams, lolTeam: {...user.lolUser.team, game: 'lol'}}
            }else {
                teams = {...teams, lolTeam: {game: 0}}
            }
        }
        if(user.dotaUser) {
            if(user.dotaUser.team) {
                teams = {...teams, dotaTeam: {...user.dotaUser.team, game: 'dota'}}
            }else {
                teams = {...teams, dotaTeam: {game: 0}}
            }
        }
        return teams;
    }

    renderLolRecTeams() {
        if(this.props.user.lolUser) {
            if (this.props.user.lolUser.team) return null
        }
        return Object.values(this.props.recommendations.LoL).map(t => {
            return(
                <div className="item" key={[t.id,t.avgLolRank]}>
                    <img className="ui avatar image" src={lol} alt="lol"/>
                    <div className="content">
                        <div className="header" style={{fontSize: '125%'}}>
                            <Link to={`/viewteam/${t.id}/${t.teamName}`} className="team-name">
                                {t.teamName}
                            </Link>
                        </div>
                        <div className="left floated">
                            {t.avgLolRank}
                        </div>
                        <div className="right floated">
                            &nbsp;{t.lolRegion}
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderDotaRecTeams() {
        if(this.props.user.dotaUser) {
            if (this.props.user.dotaUser.team) return null
        }
        return Object.values(this.props.recommendations.Dota2).map(t => {
            return(
                <div className="item" key={[t.id,t.avgDotaMmr]}>
                    <img className="ui avatar image" src={dota2} alt="dota"/>
                    <div className="content">
                        <div className="header" style={{fontSize: '125%'}}>
                            <Link to={`/viewteam/${t.id}/${t.teamName}`} className="team-name">
                                {t.teamName}
                            </Link>
                        </div>
                        mmr: {t.avgDotaMmr}
                    </div>
                </div>
            )
        })
    }

    teamCheck() {
        let teamCheck = false
        if (this.props.user.lolUser) {
            if (!this.props.user.lolUser.team) teamCheck = true
        }
        if (this.props.user.dotaUser) {
            if (!this.props.user.dotaUser.team) teamCheck = true
        }
        return teamCheck
    }

    renderRecommendations() {
        if(!this.props.user) return null
        if (isEmpty(this.props.recommendations)) return null
        if (!this.props.user.lolUser && !this.props.user.dotaUser) return null
        if (!this.teamCheck()) return null
        return(
            <div id="recommendations-text">
                <div>
                    You should checkout these teams
                </div>
                <div className="ui horizontal inverted list" id="rec-teams">
                    {this.renderLolRecTeams()}
                    {this.renderDotaRecTeams()}
                </div>
            </div>
        )
    }

    render() {
        return(
            <div className="ui" id="homepage">
                <div className="ui inverted segment">
                    <img src={lolDota} className="ui left floated image" id="lol-dota-img" alt="dota-lol"/>
                    <h1 style={{fontSize: '300%'}}>Welcome to MyTeamFinder!</h1>
                    <p id="welcome-text"><b>
                        <br></br>
                        The goal of MyTeamFinder is to<br></br>
                        make it simple and easy for<br></br>
                        players to find a suitable team.<br></br>
                        <br></br>
                        Follow the required steps to gain access <br></br>
                        to our team recommendation feature!
                    </b></p>
                </div>
                <div id="rec-button">
                    {this.renderRecButton(this.getTeams())}
                </div>
                <div id="recommendations">
                    {this.renderRecommendations()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.auth.user, recommendations: state.recommendations };
};

export default connect(mapStateToProps, {getRecommendations, resetRecommendations})(HomePage);