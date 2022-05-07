import React from "react";

const Logo = props => {
    return (
        <>
            <img className={`${props.size} image ${props.classes}`} src={props.logo} alt={props.alt} id={props.id}/>
        </>
    );
};

export default Logo;