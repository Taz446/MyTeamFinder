import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { signOut, resetTeamInvites, resetTeamRequests, resetRecommendations } from "../../actions";

import history from '../../history';

import LinkButton from '../Buttons/LinkButton'

import './header.css';

const HeaderRightMenu = props => {

    const logOutClick = async () => {
        props.resetTeamInvites();
        props.resetTeamRequests();
        props.resetRecommendations();
        if (props.auth.user.googleId) {
            props.gAuth.signOut();
        } else {
            props.signOut();
        }
        history.push('/');
    }

    const renderAdmin = () => {
        if(!props.user) return null
        if(props.user.userType === "ADMIN") {
            return(
                <div className="ui item">
                    <Link to="/admin-panel" className="profile">ADMIN</Link>
                </div>
            ) 
        }
        return null
    }
  
    const renderMenu = () => {
        if(props.auth.user) {
            return(
                <React.Fragment>
                    {renderAdmin()}
                    <div className="ui item">
                        <Link to={`/profile/${props.auth.user.id}/${props.auth.user.displayName}`} className="profile">
                            <i className="user icon"/>
                            {props.auth.user.displayName}
                        </Link>
                    </div>
                    <div className="ui item">
                        <button onClick={logOutClick} className="ui teal medium button">Logout</button>
                    </div>
                </React.Fragment>
            );
        } else {
            return(
                <React.Fragment>
                    <div className="ui item">
                        <LinkButton destination="/login" label="Login"/>
                    </div>
                </React.Fragment>
            );
        }
    };

    return(
        <React.Fragment>
            {renderMenu()}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {auth: state.auth};
};

export default connect(mapStateToProps,{signOut, resetTeamInvites, resetTeamRequests, resetRecommendations})(HeaderRightMenu);