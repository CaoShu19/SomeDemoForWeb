import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
class Spring extends Component {
    state = {  } 
    
    render() { 
        console.log(this.props.id);
        return (
            <React.Fragment>
                <h>Spring</h>
            <Outlet></Outlet>
            </React.Fragment>
        );
    }
}
 
export default Spring;