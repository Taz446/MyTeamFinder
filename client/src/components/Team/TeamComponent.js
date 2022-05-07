import React from 'react';
import { connect } from "react-redux";
import LinkButton from '../Buttons/LinkButton';
import { Link } from 'react-router-dom';
import { editUser, fetchUser, signIn } from '../../actions';

import mtf from '../../apis/mtf';

import lol from '../../resources/images/lol.png';
import dota2 from '../../resources/images/dota2.png';

import './team.css';
import { isEmpty } from 'lodash';

class TeamComponent extends React.Component {

    renderCreateTeamButton(step) {
        if(step === 3) {
            return(
                <LinkButton destination="/team-create" class="fluid" label="Create Team!"/>
            )
        }
        return null
    }

    renderRecButton(teams, step) {
        if(step < 3) return null
        if(teams.lolTeam) {
            if(teams.lolTeam.game === 0) {
                return(
                    <button className="ui button teal fluid">Get a team recommendation!</button>
                )
            }
        }
        if(teams.dotaTeam) {
            if(teams.dotaTeam.game === 0) {
                return(
                    <button className="ui button teal fluid">Get a team recommendation!</button>
                )
            }
        }
        return null
    }

    renderTeams(teams) {
        return(
            teams.map( team => {
                if(!team) return null
                if(team.game === 0) return null
                return(
                    <div className="item" key={team.game}>
                        <div className="content">
                            <Link to={`/team/${team.id}/${team.teamName}`} className="team-name">
                                {team.teamName}&nbsp;&nbsp;&nbsp;
                            </Link>
                        </div>
                        <img className="" id="tg-img" src={team.game === 'lol' ? lol : dota2} alt={team.game}></img>
                    </div>
                )
            })
        )
    }

    renderTeamList(teams, step) {
        if(step <= 3) return null
        return(
            <h1 className='ui inverted header'>My Teams
                <div className="ui inverted relaxed divided list" id="teams-list">
                        {this.renderTeams(Object.values(teams))}
                </div>
            </h1>
        )
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

    teamInvites() {
        if(!this.props.user) return null
        if(this.props.user.teamOwned) {
            if (isEmpty(this.props.teamRequests.lolTeamRequests) && isEmpty(this.props.teamRequests.dotaTeamRequests)) return null
        } else {
            if (isEmpty(this.props.teamInvites.lolTeamInvites) && isEmpty(this.props.teamInvites.dotaTeamInvites)) return null
        }
        
        const team = this.props.user.teamOwned ? true : false
        const type = team ? 'Requests' : 'Invites'

        return(
            <React.Fragment>
                <div className="ui middle aligned divided list">
                    <h1>{type} pending:</h1>
                    {this.renderTeamInvites('lol', type)}
                    {this.renderTeamInvites('dota', type)}
                </div>
            </React.Fragment>
        )
    }

    acceptInvite = async r => {
        if (r.game.id === 1) {
            await mtf.delete(`/team-invites/delete-by-lol-user/${r.id}`);
            const response = await mtf.get(`/lol-users/${r.lolUser.id}/user`);
            await this.props.editUser(response.data.id, {...response.data, lolUser: {...response.data.lolUser, team: r.team}});
            if (r.type === 'INVITE') {
                await this.props.fetchUser(response.data.id);
                this.props.signIn(this.props.users.find(u => {return u.id === response.data.id}))
            }
        }
        if (r.game.id === 2) {
            await mtf.delete(`/team-invites/delete-by-dota-user/${r.id}`);
            const response = await mtf.get(`/dota-users/${r.dotaUser.id}/user`)
            await this.props.editUser(response.data.id, {...response.data, dotaUser: {...response.data.dotaUser, team: r.team}})
            if (r.type === 'INVITE') {
                await this.props.fetchUser(response.data.id);
                this.props.signIn(this.props.users.find(u => {return u.id === response.data.id}))
            }
        }
        window.location.reload()
    }

    declineInvite = async r => {
        if (r.game.id === 1) {
            await mtf.delete(`/team-invites/delete-by-lol-user-and-team/${r.id}`);
        }
        if (r.game.id === 2) {
            await mtf.delete(`/team-invites/delete-by-dota-user-and-team/${r.id}`);
        }
        window.location.reload()
    }

    renderTeamInvites(game, type) {
        const img = game === 'lol' ? lol : dota2
        if (game === 'lol') {
            if(type === 'Requests') {
                return this.props.teamRequests.lolTeamRequests.map(r => {
                    return(
                        <div className="item" key={[r.id,r.game.id]}>
                            <div className="right floated content">
                                <button className="ui mini red button" onClick={ () => {this.declineInvite(r)}}><i className="fitted minus icon"/></button>
                            </div>
                            <div className="right floated content">
                                <button className="ui mini teal button" onClick={ () => {this.acceptInvite(r)}}><i className="fitted plus icon"/></button>
                            </div>
                            <img className="ui avatar image" src={img} alt="lol"/>
                            <div className="content">
                                <Link to={`/viewlolprofile/${r.lolUser.id}`} className="team-name">
                                    {r.lolUser.summonerName}
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
            if(type === 'Invites') {
                return this.props.teamInvites.lolTeamInvites.map(r => {
                    return(
                        <div className="item" key={[r.id,r.game.id]}>
                            <div className="right floated content">
                                <button className="ui mini red button" onClick={ () => {this.declineInvite(r)}}><i className="fitted minus icon"/></button>
                            </div>
                            <div className="right floated content">
                                <button className="ui mini teal button" onClick={ () => {this.acceptInvite(r)}}><i className="fitted plus icon"/></button>
                            </div>
                            <img className="ui avatar image" src={img} alt="dota"/>
                            <div className="content">
                                <Link to={`/viewteam/${r.team.id}/${r.team.teamName}`} className="team-name">
                                    {r.team.teamName}
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        }
        if (game === 'dota') {
            if(type === 'Requests') {
                return this.props.teamRequests.dotaTeamRequests.map(r => {
                    return(
                        <div className="item" key={[r.id,r.game.id]}>
                            <div className="right floated content">
                                <button className="ui mini red button" onClick={ () => {this.declineInvite(r)}}><i className="fitted minus icon"/></button>
                            </div>
                            <div className="right floated content">
                                <button className="ui mini teal button" onClick={ () => {this.acceptInvite(r)}}><i className="fitted plus icon"/></button>
                            </div>
                            <img className="ui avatar image" src={img} alt="lol"/>
                            <div className="content">
                                <Link to={`/viewdotaprofile/${r.dotaUser.id}`} className="team-name">
                                    {r.dotaUser.dotaName}
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
            if(type === 'Invites') {
                return this.props.teamInvites.dotaTeamInvites.map(r => {
                    return(
                        <div className="item" key={[r.id,r.game.id]}>
                            <div className="right floated content">
                                <button className="ui mini red button" onClick={ () => {this.declineInvite(r)}}><i className="fitted minus icon"/></button>
                            </div>
                            <div className="right floated content">
                                <button className="ui mini teal button" onClick={ () => {this.acceptInvite(r)}}><i className="fitted plus icon"/></button>
                            </div>
                            <img className="ui avatar image" src={img} alt="dota"/>
                            <div className="content">
                                <Link to={`/viewteam/${r.team.id}/${r.team.teamName}`} className="team-name">
                                    {r.team.teamName}
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        }
    }

    renderSteps(step) {
        return(
            <div className="ui fluid vertical steps">
                <div className={`step ${step === 1 ? 'active' : 'completed'}`}>
                    <i className="sign in alternate icon"></i>
                    <div className="content">
                        <div className="title">Log in!</div>
                        <div className="description">Log in to MyTeamFinder!</div>
                    </div>
                </div>
                <div className={`step ${step === 1 ? '' : step === 2 ? 'active' : 'completed'}`}>
                    <i className="gamepad icon"></i>
                    <div className="content">
                        <div className="title">Setup!</div>
                        <div className="description">Setup your games from your profile!</div>
                    </div>
                </div>
                <div className={`step ${step < 3 ? '' : step === 3 ? 'active' : 'completed'}`}>
                    <i className="users icon"></i>
                    <div className="content">
                        <div className="title">Ready!</div>
                        <div className="description">Look for a team or create your own!</div>
                    </div>
                </div>
                {this.renderCreateTeamButton(step)}
                <div className='side-bot'>
                    {this.renderTeamList(this.getTeams(), step)}
                </div>
                <div className='side-bot15'>
                    {this.teamInvites()}
                </div>
            </div>
        );
    }

    render() {
        let teamCheck = false;
        if(!this.props.user) {
            return(
                <div>
                    {this.renderSteps(1)}
                </div>
            );
        }
        if (!this.props.user.lolUser && !this.props.user.dotaUser) {
            return(
                <div>
                    {this.renderSteps(2)}
                </div>
            );
        }
        if(this.props.user.lolUser) {
            if (this.props.user.lolUser.team) {
                teamCheck = true;
            }
        }
        if(this.props.user.dotaUser) {
            if (this.props.user.dotaUser.team) {
                teamCheck = true;
            }
        }
        if (!teamCheck) {
            return(
                <div>
                    {this.renderSteps(3)}
                </div>
            );
        }
        return(
            <div>
                {this.renderSteps(4)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { user: state.auth.user, teamInvites: state.teamInvites, teamRequests: state.teamRequests, users: Object.values(state.users) }
}

export default connect(mapStateToProps, { editUser, fetchUser, signIn })(TeamComponent);