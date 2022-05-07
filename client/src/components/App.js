import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchGames, signIn, signOut, createUser, fetchUserByGoogleId, fetchTeamInvites, fetchTeamRequests, resetTeamInvites, resetTeamRequests} from '../actions';
import { isEmpty } from 'lodash';

import './myteamfinder.css';

import { googleClientId } from '../secrets/keys';
import history from '../history';
import PageNotFound from './Utility/404';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import HomePage from './HomePage/HomePage';
import Login from './Header/LoginRegister/Login'
import Register from './Header/LoginRegister/Register'
import UserSettings from './UserProfile/UserSettings';
import ViewUser from './UserProfile/ViewUser';
import ViewLolUser from './UserProfile/ViewLolUser';
import ViewDotaUser from './UserProfile/ViewDotaUser';
import EditUser from './UserProfile/EditUser';
import PasswordChange from './UserProfile/PasswordChange';
import EditLolUser from './UserProfile/LolProfile/EditLolUser';
import LolExperience from './UserProfile/LolProfile/LolExperience';
import EditDotaUser from './UserProfile/DotaProfile/EditDotaUser';
import DotaExperience from './UserProfile/DotaProfile/DotaExperience';
import BrowseContent from './Posts/BrowseContent';
import TeamComponent from './Team/TeamComponent';
import TeamCreate from './Team/TeamCreate';
import TeamSettings from './Team/TeamProfile/TeamSettings';
import TeamAbout from './Team/TeamProfile/TeamAbout';
import CreatePost from './Posts/CreatePost';
import Admin from './Admin/Admin';

class App extends React.Component {

    componentDidMount() { 
        this.gamesInit();
        this.onAuthInit();
        this.teamInvitesInit();
    };

    render(){
        return (
            <div className="ui body-bg">
                <Router history={history}>
                    <div id="mtf-container">
                        <Header gAuth={this.auth} user={this.props.auth.user}/>
                            <div className="ui inverted segment" id="mtfcontent">
                                <div className='ui grid'>
                                    <div className='two column row'>
                                        <div className='thirteen wide column'>
                                            <Switch>
                                                <Route path="/" exact component={HomePage} />
                                                <Route path="/login" exact render={() => <Login gAuth={this.auth}/>}/>
                                                <Route path="/register" exact component={Register} />
                                                <Route path="/profile/:id/:displayName" exact component={UserSettings}/>
                                                <Route path="/viewprofile/:id/:displayName" exact component={ViewUser}/>
                                                <Route path="/viewlolprofile/:id" exact component={ViewLolUser}/>
                                                <Route path="/viewdotaprofile/:id" exact component={ViewDotaUser}/>
                                                <Route path="/edit-display-name/:id" exact component={EditUser}/>
                                                <Route path="/password-change/:id" exact component={PasswordChange}/>
                                                <Route path="/lol-setup/:id" exact component={EditLolUser}/>
                                                <Route path="/edit-lol-profile" exact component={LolExperience}/>
                                                <Route path="/dota-setup/:id" exact component={EditDotaUser}/>
                                                <Route path="/edit-dota-profile" exact component={DotaExperience}/>
                                                <Route path="/browse/:game" exact component={BrowseContent}/>
                                                <Route path="/team-create" exact component={TeamCreate}/>
                                                <Route path="/team/:id/:teamName" exact component={ownProps => <TeamSettings op={ownProps} view={false} />}/>
                                                <Route path="/viewteam/:id/:teamName" exact component={ownProps => <TeamSettings op={ownProps} view={true} key={window.location.pathname}/>}/>
                                                <Route path="/team-about/:id" exact component={TeamAbout}/>
                                                <Route path="/create-post/:tag" exact component={CreatePost}/>
                                                <Route path="/admin-panel" exact component={Admin}/>
                                                <Route path="" component={PageNotFound}/>
                                            </Switch>
                                        </div>
                                        <div className='three wide column' id='right-content'>
                                            <TeamComponent/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <Footer/>
                    </div>
                </Router>
            </div>);
    }

    teamInvitesInit = async () => {
        if(this.props.auth.user) {
            await this.props.fetchTeamInvites(this.props.auth.user);
            await this.props.fetchTeamRequests(this.props.auth.user);
        }
    }

    gamesInit = async () => {
        if (isEmpty(this.props.games)) {
            await this.props.fetchGames();
        }
    }

    onAuthInit = async () => {
        await window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: googleClientId,
                scope: 'email'
            });
            this.auth = window.gapi.auth2.getAuthInstance();
            this.onAuthChange(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this.onAuthChange);
        });
    }

    onAuthChange = async (isSignedIn) => {
        if (isSignedIn) {
            const user = { 
                email: this.auth.currentUser.get().getBasicProfile().getEmail().toLowerCase(), 
                displayName: (`${this.auth.currentUser.get().getBasicProfile().getGivenName()}_${this.auth.currentUser.get().getBasicProfile().getFamilyName()[0]}`),
                googleId: this.auth.currentUser.get().getId(),
                userType: 'USER'
            };

            let cUser = this.props.users.find(u => {return u.googleId === user.googleId});

            if (!cUser) {
                try{
                    await this.props.fetchUserByGoogleId(user.googleId);
                }catch(e) {
                    if(e.message === "Request failed with status code 404") {
                        await this.props.createUser(user);
                    }
                }finally{
                    cUser = this.props.users.find(u => {return u.googleId === user.googleId});
                }
            }

            this.props.fetchTeamInvites(cUser);
            this.props.fetchTeamRequests(cUser);
            this.props.signIn(cUser);
        } else {
            if(!this.props.auth.user) {
               return 
            }
            if(this.props.auth.user.googleId) {
                this.props.signOut();
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {auth: state.auth, users: Object.values(state.users), games: Object.values(state.games)}
};

export default connect(mapStateToProps, {fetchGames, signIn, signOut, createUser, fetchUserByGoogleId, fetchTeamInvites, fetchTeamRequests, resetTeamInvites, resetTeamRequests})(App);