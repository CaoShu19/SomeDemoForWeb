import React, { Component } from 'react';
import NavBar from './navbar';
import Home from './home';
import Linux from './linux';
import Web from './web';
import NotFound from './notFound'
import Spring from './spring';
import {Routes,Route,Navigate} from 'react-router-dom';
import WebContent from './webContent';

class App extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <NavBar></NavBar>
                <div className="container">
                    <Routes>
                        <Route path='/' element={<Home></Home>}></Route>
                        <Route path='/linux' element={<Linux></Linux>}>
                            <Route path='homework' element={<h4>homework ccc</h4>}></Route>
                            <Route path='homework1' element={<h4>homework bbb</h4>}></Route>
                            <Route path='*' element={<h4>other</h4>}></Route>
                        </Route>
                        <Route path='/spring' element={<Spring id= "hahhaa"></Spring>}>
                            <Route path='homework' element={<h4>homework ccc</h4>}></Route>
                            <Route path='homework1' element={<h4>homework bbb</h4>}></Route>
                        </Route>
                        <Route path='/web' element={<Web></Web>}></Route>
                        <Route path='/web/content' element={<WebContent></WebContent>}></Route>
                        <Route path='/404' element={<NotFound></NotFound>}></Route>
                        <Route path='*' element={<Navigate replace to = "/404"></Navigate>}></Route>
                    </Routes>
                </div>

            
            </React.Fragment>
        );
    }
}
 
export default App;