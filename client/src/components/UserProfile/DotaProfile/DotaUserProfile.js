import React from "react";
import {connect} from 'react-redux';
import {editUser, signIn} from '../../../actions';
import dota from '../../../apis/openDotaApi';
import { Link } from 'react-router-dom';

import LinkButton from '../../Buttons/LinkButton';

import dotaImg from './DotaRankImage';
import positionImage from '../../UserProfile/LolProfile/LolPositionImage';

import '../userProfile.css';

class DotaUserProfile extends React.Component {
    
    recalibrate = async () => {
        const cUser = this.props.user;
        const newDotaUser = await dota.get(`/${cUser.dotaUser.dotaId}`);
        cUser.dotaUser.dotaName = newDotaUser.data.profile.personaname;
        cUser.dotaUser.soloMmr = newDotaUser.data.solo_competitive_rank;
        cUser.dotaUser.partyMmr = newDotaUser.data.competitive_rank;
        try{
            await this.props.editUser(cUser.id, cUser);
        }catch(e) {
            console.log('error')
            return
        }
        this.props.signIn(this.props.users.find(u => {return u.id === this.props.user.id}))
    }

    renderTeam() {
        if(this.props.user.dotaUser.team) {
            return(
                <React.Fragment>
                    <span  style={{fontSize:"65%",fontWeight: "bold"}}>
                        <Link to={`/viewteam/${this.props.user.dotaUser.team.id}/${this.props.user.dotaUser.team.teamName}`} id="team-name">
                            _{this.props.user.dotaUser.team.teamName}
                        </Link>
                    </span>
                </React.Fragment>
            )
        }
        return null
    }

    renderPrefPostions() {
        const pos = [];
        if(this.props.user.dotaUser.carry) pos.push('carry')
        if(this.props.user.dotaUser.mid2) pos.push('mid2')
        if(this.props.user.dotaUser.offlane) pos.push('offlane')
        if(this.props.user.dotaUser.farmSupport) pos.push('farmSupport')
        if(this.props.user.dotaUser.hardSupport) pos.push('hardSupport')
        return pos.map( p => {
            return(
                <div className='field' key={p}>
                    <img src={positionImage(p)} alt={p} className='ui mini image position-image'/>
                </div>
            )
        })
    }

    render() {
        if (!this.props.user.dotaUser) {
            return(
                <div id="game-button">
                    <LinkButton destination={`/dota-setup/${this.props.user.id}`} label="Set up your Dota2 Account!"/>
                </div>
            );
        }
        return(
            <div className="ui container">
                <div className="ui grid">
                    <div className="three column row">
                        <div className="six wide column">
                            <div className="user-game-name"><b>{this.props.user.dotaUser.dotaName}</b>&nbsp;&nbsp;{this.renderTeam()}</div>
                            <div className="user-email">
                                <b>solo: {this.props.user.dotaUser.soloMmr}&nbsp;&nbsp;&nbsp;party: {this.props.user.dotaUser.partyMmr}&nbsp;&nbsp;&nbsp;{this.props.user.dotaUser.team ? this.props.user.dotaUser.team.name : ''}</b>
                            </div>
                            <button className="ui teal mini button" onClick={this.recalibrate}>recalibrate</button>
                            <div className='field inline' id='pref-positions'>
                                {this.renderPrefPostions()}
                            </div>
                            <div>
                                <LinkButton destination={`/edit-dota-profile`} size="mini" label="Update profile"/>
                            </div>
                        </div>
                        <div className="seven wide column">
                            <div className="ui cards" style={{marginTop:"1%"}}>
                                <div className="card">
                                    <div className="content">
                                        <div className="center aligned header">My Experience</div>
                                        <div className="description">
                                            {this.props.user.dotaUser.dotaExp}
                                        </div>
                                        <br></br>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="three wide column" id="game-rank">
                            <img src={dotaImg(this.props.user.dotaUser.soloMmr)} alt="rank"></img>
                        </div>
                    </div>
                </div> 
            </div>
    )}; 
}

const mapStateToProps = (state) => {
    return {user: state.auth.user, users: Object.values(state.users)};
}

export default connect(mapStateToProps, {editUser, signIn})(DotaUserProfile);