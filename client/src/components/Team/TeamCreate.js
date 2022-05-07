import React from "react";
import Modal from "../Modal";
import TeamCreateForm from './TeamCreateForm';
import {connect} from 'react-redux';

import Denied from "../Utility/Denied";

const TeamCreate = props => {
    if(!props.user) return <Denied/>
    if(props.user.teamOwned) return <Denied/>
    if(!props.user.lolUser && !props.user.dotaUser) return <Denied/>
    return(
        <div>
            <Modal title="Create your own team!" content={<TeamCreateForm/>}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {user: state.auth.user};
}

export default connect(mapStateToProps)(TeamCreate);