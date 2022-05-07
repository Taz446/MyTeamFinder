import React from "react";
import history from "../../history";

const CloseButton = () => {
    return (
        <div className="ui icon buttons right floated">
            <button onClick={() => history.goBack()} className="ui right floated button">
                <i className="close icon"/>
            </button>
        </div>
    );
};

export default CloseButton;