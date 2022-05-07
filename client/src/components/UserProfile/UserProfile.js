import React from "react";
import {connect} from 'react-redux';

import LinkButton from '../Buttons/LinkButton';

import 'flag-icons/css/flag-icons.css'

import './userProfile.css';

const UserProfile = props => {
    return(
        <div className="ui container">
            <div className="ui grid">
                <div className="two column row">
                    <div className="thirteen wide column">
                        <i className="user outline huge icon"></i>
                        <span className="user-dname">&nbsp;<b>{props.user.displayName}</b></span>
                        <div className="user-email"><b>{props.user.email}</b></div>
                    </div>
                    <div className="three wide column" id="flag">
                        <span className={`flag-size fi fi-${props.user.country ? props.user.country.toLowerCase() : 'xx'}`}></span>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <LinkButton destination={`/edit-display-name/${props.user.id}`} label="Change Display Name"/>
                        {!props.user.googleId ? <LinkButton destination={`/password-change/${props.user.id}`} label="Change Password" floated="right"/> : null}
                    </div>
                </div>
            </div> 
        </div>
    );
}

const mapStateToProps = (state) => {
    return {user: state.auth.user};
}

export default connect(mapStateToProps)(UserProfile);