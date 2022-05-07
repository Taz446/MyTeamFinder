import React from "react";
import './footer.css';
import logo from '../../resources/images/logo.png'

import Logo from '../Header/Logo'
import { Link } from "react-router-dom";

const Footer = props => {
    return (
        <div className="ui inverted segment" id="mtffooter">
            <div className="ui grid">
                <div className="two column row">
                    <div className="twelve wide column">
                        <h1>UTILITY LINKS</h1>
                        <div className="ui divider"></div>
                    </div>
                    <div className="four wide column right floated">
                        <Link to="/" id="logo" >
                            <Logo logo={logo} classes='ui right floated' id="footer-logo" alt="footer-logo"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;