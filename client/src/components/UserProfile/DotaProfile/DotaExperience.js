import React from "react";
import Modal from "../../Modal";
import DotaExperienceForm from "./DotaExperienceForm";
import {connect} from 'react-redux';

import Denied from "../../Utility/Denied";

const DotaExperience = props => {
    if(!props.user) return <Denied/>
    if(!props.user.dotaUser) return <Denied/>
    return(
        <div>
            <Modal title="Edit your Dota2 Profile" content={<DotaExperienceForm/>}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {user: state.auth.user};
}

export default connect(mapStateToProps)(DotaExperience);