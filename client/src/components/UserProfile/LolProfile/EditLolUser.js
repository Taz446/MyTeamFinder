import React from "react";
import Modal from "../../Modal";
import EditLolUserForm from "./EditLolUserForm";
import {connect} from 'react-redux';

import Denied from "../../Utility/Denied";

const EditLolUser = props => {
    if(!props.user) return <Denied/>
    if(props.user.lolUser) return <Denied/>
    return(
        <div>
            <Modal title="Connect your League of Legends Account" content={<EditLolUserForm/>}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {user: state.auth.user};
}

export default connect(mapStateToProps)(EditLolUser);