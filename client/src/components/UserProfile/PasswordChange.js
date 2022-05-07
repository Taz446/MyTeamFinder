import React from "react";
import Modal from "../Modal";
import PasswordChangeForm from "./PasswordChangeForm";
import {connect} from 'react-redux';

import Denied from "../Utility/Denied";


const PasswordChange = props => {
    if(!props.user) return <Denied/>
    if(props.user.googleId) return <Denied/>
    return (
        <div>
            <Modal title="Password Change" content={<PasswordChangeForm/>}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {user: state.auth.user};
}

export default connect(mapStateToProps)(PasswordChange);