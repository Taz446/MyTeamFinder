import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { resetPosts } from "../../actions";

import logo from '../../resources/images/logo.png';
import lol from '../../resources/images/lol.png';
import dota2 from '../../resources/images/dota2.png';
import './header.css';

import Logo from "./Logo";
import HeaderRightMenu from "./HeaderRightMenu";

class Header extends React.Component {

    render() {
        return (
            <div className="ui inverted borderless menu" id="header">
                <Link to="/" id="logo" >
                    <Logo logo={logo}/>
                </Link>
                <Link to="/browse/league-of-legends" className="item header-link" onClick={() => {this.props.resetPosts()}}>
                    <img className="mini image" src={lol} alt="gameLogo"/>
                </Link>
                <Link to="/browse/dota2" className="item header-link" onClick={() => {this.props.resetPosts()}}>
                    <img className="mini image" src={dota2} alt="gameLogo"/>
                </Link>
                <div className="right menu" id="rightMenu">
                    <HeaderRightMenu gAuth={this.props.gAuth} user={this.props.user}/>
                </div>
            </div>  
        );
    }
};

const mapStateToProps = (state) => {
    return { posts: Object.values(state.posts) }
}

export default connect(mapStateToProps, {resetPosts})(Header);