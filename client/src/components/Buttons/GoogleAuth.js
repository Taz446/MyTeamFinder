import React from 'react';
import history from "../../history";

class GoogleAuth extends React.Component {

    logoutClick(gAuth) {
        gAuth.signIn();
        history.goBack();
    }

    render() {
        return (
            <React.Fragment>
                <button onClick={() => {this.logoutClick(this.props.gAuth)}} 
                    className='ui red google button'>
                    <i className="google icon"/>
                    Sign In With Google
                </button>
            </React.Fragment>
        );
    }
}

export default GoogleAuth;