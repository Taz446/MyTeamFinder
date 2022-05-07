import React from "react";
import { connect } from "react-redux";
import { fetchTeam,fetchGames, resetTeams } from "../../../actions";
import { Tab } from "semantic-ui-react";
import mtf from "../../../apis/mtf";

import MtfLoader from "../../MtfLoader";
import Denied from "../../Utility/Denied";

import { isEmpty } from "lodash";

import TeamProfile from './TeamProfile';
import TeamLolProfile from './TeamLolProfile';
import TeamDotaProfile from './TeamDotaProfile';
import ViewTeamProfile from './ViewTeamProfile';
import ViewTeamLolProfile from './ViewTeamLolProfile';
import ViewTeamDotaProfile from './ViewTeamDotaProfile';

class TeamSettings extends React.Component {
    state ={ 
        team: (!isEmpty(this.props.teams) ? this.props.teams.find( t => {return t.id == this.props.teamId}) : null),
        lolPlayers: null,
        dotaPlayers: null
    }

    componentDidMount() {
        this.init();
    }

    init = async () => {
        if(!isEmpty(this.props.teams) && !this.state.team) {
            this.props.resetTeams();
        }
        if(isEmpty(this.props.teams)) {
            await this.props.fetchTeam(this.props.teamId)
        }
        if(!this.state.lolPlayers && this.state.team) {
            const response = await mtf.get(`/lol-users/team/${this.state.team.id}`)
            this.setState({lolPlayers: response.data})
        }
        if(!this.state.dotaPlayers && this.state.team) {
            const response2 = await mtf.get(`/dota-users/team/${this.state.team.id}`)
            this.setState({dotaPlayers: response2.data})
        }
        if(isEmpty(this.props.games)) {
            await this.props.fetchGames();
        }
        this.checkGames(this.props.games);
        this.forceUpdate();
    }

    panes = [{ menuItem: 'Team Profile', render: () => <Tab.Pane className="inverted">{this.renderContent('Team Profile', this.props.view)}</Tab.Pane> }];

    checkGames = (games) => {
        for(const game in games) {
            this.panes.push({ menuItem: games[game].name, render: () => <Tab.Pane className="inverted">{this.renderContent(games[game].name, this.props.view)}</Tab.Pane> });
        }
    }

    renderContent(itemName, view) {
        if(view) {
            switch(itemName) {
                case 'Team Profile':
                    return <ViewTeamProfile team={this.state.team}/>;
                case 'League of Legends':
                    return <ViewTeamLolProfile team={this.state.team} players={this.state.lolPlayers}/>;
                case 'Dota2':
                    return <ViewTeamDotaProfile team={this.state.team} players={this.state.dotaPlayers}/>;
                default:
                    return null;
            }
        }
        switch(itemName) {
            case 'Team Profile':
                if(!this.props.user) return <Denied/>
                if(this.props.user.lolUser) {
                    if(this.props.user.lolUser.team) {
                        if(this.props.user.lolUser.team.id == this.props.teamId) return <TeamProfile team={this.state.team}/>
                    }
                }
                if(this.props.user.dotaUser) {
                    if(this.props.user.dotaUser.team) {
                        if(this.props.user.dotaUser.team.id == this.props.teamId) return <TeamProfile team={this.state.team}/>
                    }
                }
                return <Denied/>
            case 'League of Legends':
                if(!this.props.user) return <Denied/>
                if(this.props.user.lolUser) {
                    if(this.props.user.lolUser.team) {
                        if(this.props.user.lolUser.team.id == this.props.teamId) return <TeamLolProfile team={this.state.team} players={this.state.lolPlayers}/>
                    }
                }
                return <Denied/>
            case 'Dota2':
                if(!this.props.user) return <Denied/>
                if(this.props.user.dotaUser) {
                    if(this.props.user.dotaUser.team) {
                        if(this.props.user.dotaUser.team.id == this.props.teamId) return <TeamDotaProfile team={this.state.team} players={this.state.dotaPlayers}/>
                    }
                }
                return <Denied/>
            default:
                return null;
        }
    }
    
    render() {
        if(this.state.team && !isEmpty(this.props.games)) {
            return (
                <div className="ui grid">
                    <div className="three wide column"></div>
                    <div className="ten wide column">
                        <Tab panes={this.panes} menu={{inverted:true, secondary: true, pointing: true}} ></Tab>
                    </div>
                    <div className="three wide column"></div>
                </div>
            );
        } else {
            return(
                <MtfLoader/>
            );
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    return {user: state.auth.user, games: state.games, teamId: ownProps.op.match.params.id, teams: Object.values(state.teams)}
}

export default connect(mapStateToProps, {fetchTeam, fetchGames, resetTeams})(TeamSettings);