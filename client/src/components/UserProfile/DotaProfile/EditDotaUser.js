import React from "react";
import Modal from "../../Modal";
import EditDotaUserForm from "./EditDotaUserForm";
import {connect} from 'react-redux';

import Denied from "../../Utility/Denied";

const EditDotaUser = props => {
    if(!props.user) return <Denied/>
    if(props.user.dotaUser) return <Denied/>
    return(
        <div>
            <Modal title="Connect your Dota2 Account" content={<EditDotaUserForm/>}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {user: state.auth.user};
}

export default connect(mapStateToProps)(EditDotaUser);