import React, { PureComponent } from 'react';
import {Button} from '@material-ui/core';



class HotelsContainer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            hotels: [],

        }
    }

    render() {

        return (
            <React.Fragment>
                <Button variant="contained" size="large" color="secondary" >Load Hotels</Button>
            </React.Fragment>
        )

    }
}

export default HotelsContainer;