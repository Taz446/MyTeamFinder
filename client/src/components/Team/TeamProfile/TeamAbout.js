import React from "react";
import Modal from "../../Modal";
import {connect} from 'react-redux';
import TeamAboutForm from "./TeamAboutForm";
import { fetchTeam } from "../../../actions";

import Denied from "../../Utility/Denied";

import { isEmpty } from "lodash";

class TeamAbout extends React.Component {
    state ={ team: (!isEmpty(this.props.teams) ? this.props.teams.find( t => {return t.id == this.props.teamId}) ? this.props.teams.find( t => {return t.id == this.props.teamId}) : null : null)}

    componentDidMount() {
        this.init();
    }

    init = async () => {
        if(isEmpty(this.props.teams)) {
            await this.props.fetchTeam(this.props.teamId)
        }
        if(!this.props.teams.find(t => {return t.id == this.props.teamId})) {
            this.props.fetchTeam(this.props.teamId);
        }
        this.forceUpdate();
    }

    render() {
        if(!this.props.user) return <Denied/>
        if(!this.props.user.teamOwned) return <Denied/>
        return(
            <div>
                <Modal title="Update About Section" content={<TeamAboutForm team={this.state.team}/>}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { user: state.auth.user, teamId: ownProps.match.params.id, teams: Object.values(state.teams)};
}

export default connect(mapStateToProps, {fetchTeam})(TeamAbout);