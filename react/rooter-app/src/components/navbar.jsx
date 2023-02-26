import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {
    state = {  } 
    render() { 
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                        <Link className="navbar-brand" to="#">讲义</Link>
                        <Link className="navbar-brand" to="/">Home</Link>
                        <Link className="nav-link" to="/linux">Linux</Link>
                        <Link className="nav-link" to="/spring">Spring</Link>
                        <Link className="nav-link" to="/web">Web</Link>

                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className='navbar-nav'>                     
                        </div>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    </div>
                </div>
            </nav>
        );
    }
}
 
export default NavBar;