import React from "react";
import Modal from "../Modal";
import EditUserForm from "./EditUserForm";
import {connect} from 'react-redux';

import Denied from "../Utility/Denied";

const EditUser = props => {
    if(!props.user) return <Denied/>
    return (
        <div>
            <Modal title="Edit Display Name" content={<EditUserForm/>}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {user: state.auth.user};
}

export default connect(mapStateToProps)(EditUser);