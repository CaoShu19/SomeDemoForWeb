import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

class Linux extends Component {
    state = {  } 
    render() { 
        return (
        <React.Fragment>
            <h>Linux</h>
            <hr></hr>
            <Outlet></Outlet>
        </React.Fragment>
        );
    }
}
 
export default Linux;