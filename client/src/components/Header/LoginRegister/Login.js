import React from "react";
import Modal from "../../Modal";
import LoginForm from "./LoginForm";
import {connect} from 'react-redux';

import Denied from "../../Utility/Denied";

const Login = props => {
    if(props.user) return <Denied/>
    return (
        <div>
            <Modal title="Login" content={<LoginForm gAuth={props.gAuth}/>}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {user: state.auth.user};
}

export default connect(mapStateToProps)(Login);