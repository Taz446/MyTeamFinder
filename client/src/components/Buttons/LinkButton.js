import React from 'react'
import { Link } from 'react-router-dom';

const LinkButton = props => {
    return(
        <React.Fragment>
            <Link to={props.destination}>
                <button className={`ui teal ${props.size ? props.size : 'medium'} button ${props.floated ? `${props.floated} floated` : ''} ${props.class}`} id={props.id}>{props.label}</button>
            </Link>
        </React.Fragment>
    );
};

export default LinkButton