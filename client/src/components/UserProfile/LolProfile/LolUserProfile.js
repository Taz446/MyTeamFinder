import React from "react";
import {connect} from 'react-redux';
import axios from "axios";
import {editUser, signIn} from '../../../actions';
import { Link } from 'react-router-dom';

import { lolApiKey } from "../../../secrets/keys"; 

import LinkButton from '../../Buttons/LinkButton';

import positionImage from '../../UserProfile/LolProfile/LolPositionImage';
import lolImg from './LolRankImage';

import '../userProfile.css';

class LolUserProfile extends React.Component {
    
    recalibrate = async () => {
        const cUser = this.props.user;
        const lolUserRanked = await axios.get(`https://${cUser.lolUser.lolRegion}.api.riotgames.com/lol/league/v4/entries/by-summoner/${cUser.lolUser.lolId}?api_key=${lolApiKey}`);
        const lolUser = lolUserRanked.data.find(u => {return u.queueType === "RANKED_SOLO_5x5"});
        cUser.lolUser.rank = (lolUser ? `${lolUser.tier}_${lolUser.rank}` : null);
        try{
            await this.props.editUser(cUser.id, cUser);
        }catch(e) {
            console.log('error')
            return
        }
        this.props.signIn(this.props.users.find(u => {return u.id === this.props.user.id}))
    }

    renderTeam() {
        if(this.props.user.lolUser.team) {
            return(
                <React.Fragment>
                    <span  style={{fontSize:"65%",fontWeight: "bold"}}>
                        <Link to={`/viewteam/${this.props.user.lolUser.team.id}/${this.props.user.lolUser.team.teamName}`} id="team-name">
                            _{this.props.user.lolUser.team.teamName}
                        </Link>
                    </span>
                </React.Fragment>
            )
        }
        return null
    }

    renderPrefPostions() {
        const pos = [];
        if(this.props.user.lolUser.top) pos.push('top')
        if(this.props.user.lolUser.jungle) pos.push('jungle')
        if(this.props.user.lolUser.mid) pos.push('mid')
        if(this.props.user.lolUser.bottom) pos.push('bottom')
        if(this.props.user.lolUser.support) pos.push('support')
        return pos.map( p => {
            return(
                <div className='field' key={p}>
                    <img src={positionImage(p)} alt={p} className='ui mini image position-image'/>
                </div>
            )
        })
    }

    render() {
        if (!this.props.user.lolUser) {
            return(
                <div id="game-button">
                    <LinkButton destination={`/lol-setup/${this.props.user.id}`} label="Set up your LoL Account!"/>
                </div>
            );
        }
        return(
            <div className="ui container">
                <div className="ui grid">
                    <div className="three column row">
                        <div className="six wide column">
                            <div className="user-game-name"><b>{this.props.user.lolUser.summonerName}</b>&nbsp;&nbsp;{this.renderTeam()}</div>
                            <div className="user-email">
                                <b>{this.props.user.lolUser.rank}&nbsp;&nbsp;&nbsp;{this.props.user.lolUser.lolRegion}</b>
                            </div>
                            <button className="ui teal mini button" onClick={this.recalibrate}>recalibrate</button>
                            <div className='field inline' id='pref-positions'>
                                {this.renderPrefPostions()}
                            </div>
                            <div>
                                <LinkButton destination={`/edit-lol-profile`} size="mini" label="Update profile"/>
                            </div>
                        </div>
                        <div className="seven wide column">
                            <div className="ui cards" style={{marginTop:"1%"}}>
                                <div className="card">
                                    <div className="content">
                                        <div className="center aligned header">My Experience</div>
                                        <div className="description">
                                            {this.props.user.lolUser.lolExp}
                                        </div>
                                        <br></br>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="three wide column" id="game-rank">
                            <img src={lolImg(this.props.user.lolUser.rank)} alt="rank"></img>
                        </div>
                    </div>
                </div> 
            </div>
    )}; 
}

const mapStateToProps = (state) => {
    return {user: state.auth.user, users: Object.values(state.users)};
}

export default connect(mapStateToProps, {editUser, signIn})(LolUserProfile);