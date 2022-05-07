import React from "react";
import {connect} from 'react-redux';

import 'flag-icons/css/flag-icons.css'

import './userProfile.css';

const ViewUserProfile = props => {
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
            </div> 
        </div>
    );
}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(ViewUserProfile);