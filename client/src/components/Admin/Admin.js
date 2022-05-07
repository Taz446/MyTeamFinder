import React from "react";
import {connect} from 'react-redux';

import Denied from "../Utility/Denied";

import '../UserProfile/userProfile.css';

const Admin = props => {
    if(!props.user) return <Denied/>
    if(props.user.userType !== 'ADMIN') return <Denied/>
    return (
        <div className="centered">
            <h1>ADMIN PANEL</h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {user: state.auth.user};
}

export default connect(mapStateToProps)(Admin);