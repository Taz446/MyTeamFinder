import React from "react";
import Modal from "../../Modal";
import LolExperienceForm from "./LolExperienceForm";
import {connect} from 'react-redux';

import Denied from "../../Utility/Denied";

const LolExperience = props => {
    if(!props.user) return <Denied/>
    if(!props.user.lolUser) return <Denied/>
    return(
        <div>
            <Modal title="Edit your League of Legends Profile" content={<LolExperienceForm/>}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {user: state.auth.user};
}

export default connect(mapStateToProps)(LolExperience);