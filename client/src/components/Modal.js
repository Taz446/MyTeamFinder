import React from "react";
import ReactDOM from "react-dom";

import history from '../history';
import CloseButton from "./Buttons/CloseButton";

const Modal = props => {
    return (
        ReactDOM.createPortal(
            <div onMouseDown={() => history.goBack()} className="ui dimmer modals visible active">
                <div onMouseDown={e => e.stopPropagation()} className="ui standard modal visible active">
                    <div className="header">
                        {props.title}
                        <CloseButton/>
                    </div>
                    <div className="content">
                        {props.content}
                    </div>
                    <div className="actions">
                        {props.actions}
                    </div>
                </div>
            </div>,
            document.querySelector('#modal')
        )
    );
};

export default Modal;