import React from "react";
import { connect } from "react-redux";
import { fetchUser,fetchGames } from "../../actions";
import { Tab } from "semantic-ui-react";

import MtfLoader from "../MtfLoader";

import { isEmpty } from "lodash";
import ViewUserProfile from "./ViewUserProfile";
import ViewLolUserProfile from "./LolProfile/ViewLolUserProfile";
import ViewDotaUserProfile from './DotaProfile/ViewDotaUserProfile';

class ViewUser extends React.Component {
    state = {user: null}

    componentDidMount() {
        this.init();
    }

    init = async () => {
        await this.props.fetchUser(this.props.userId)
        this.setState({user: this.props.users.find( u => {return u.id == this.props.userId})})
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
                return <ViewUserProfile user={this.state.user}/>;
            case 'League of Legends':
                return <ViewLolUserProfile user={this.state.user}/>;
            case 'Dota2':
                return <ViewDotaUserProfile user={this.state.user}/>;
            default:
                return null;
        }
    }
    
    render() {
        if(this.state.user && !isEmpty(this.props.games)) {
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
    return { games: state.games, userId: ownProps.match.params.id, users: Object.values(state.users)}
}

export default connect(mapStateToProps, {fetchUser, fetchGames})(ViewUser);