import React from "react";
import { connect } from "react-redux";
import { fetchUser,fetchGames } from "../../actions";
import { Tab } from "semantic-ui-react";

import MtfLoader from "../MtfLoader";
import Denied from "../Utility/Denied";

import { isEmpty } from "lodash";
import UserProfile from "./UserProfile";
import LolUserProfile from "./LolProfile/LolUserProfile";
import DotaUserProfile from './DotaProfile/DotaUserProfile';

class UserSettings extends React.Component {

    componentDidMount() {
        this.init();
    }

    init = async () => {
        if(isEmpty(this.props.games)) {
            await this.props.fetchGames();
        }
        this.checkGames(this.props.games);
        this.forceUpdate();
    }

    panes = [{ menuItem: 'User Profile', render: () => <Tab.Pane className="inverted">{this.renderContent('User Profile')}</Tab.Pane> }];

    checkGames = (games) => {
        for(const game in games) {
            this.panes.push({ menuItem: games[game].name, render: () => <Tab.Pane className="inverted">{this.renderContent(games[game].name)}</Tab.Pane> });
        }
    }

    renderContent(itemName) {
        switch(itemName) {
            case 'User Profile':
                return <UserProfile/>;
            case 'League of Legends':
                return <LolUserProfile/>;
            case 'Dota2':
                return <DotaUserProfile/>;
            default:
                return null;
        }
    }
    
    render() {
        if(!this.props.auth.user) return <MtfLoader/>
        if(this.props.auth.user.id != this.props.userId) return <Denied/>
        if(this.props.auth.user && !isEmpty(this.props.games)) {
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
    return {auth: state.auth, games: state.games, userId: ownProps.match.params.id}
}

export default connect(mapStateToProps, {fetchUser, fetchGames})(UserSettings);