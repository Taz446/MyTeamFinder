import React from 'react'
import { Loader,Segment } from "semantic-ui-react";

const MtfLoader = () => {
    return(
        <Segment inverted>
            <Loader active inverted>Loading</Loader>
        </Segment>
    );
}

export default MtfLoader