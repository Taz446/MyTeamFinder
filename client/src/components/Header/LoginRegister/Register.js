import React from "react";
import Modal from "../../Modal";
import RegisterForm from "./RegisterForm";
import {connect} from 'react-redux';

import Denied from "../../Utility/Denied";

const Register = props => {
    if(props.user) return <Denied/>
    return (
        <div>
            <Modal title="Register" content={<RegisterForm/>}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {user: state.auth.user};
}

export default connect(mapStateToProps)(Register);