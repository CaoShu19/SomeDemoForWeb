import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Web extends Component {
    state = { 
        webs:[
            {id:1,title:"HTML1"},
            {id:2,title:"HTML2"},
            {id:3,title:"HTML3"},
            {id:4,title:"HTML4"},
            {id:5,title:"HTML5"},
        ]
     } 
    render() { 
        return (
            <React.Fragment>
                <div>
                    {this.state.webs.map(web=>(
                        <div key={web.id}>
                            <Link to={`/web/content?chapter=${web.id}`}>{web.id+" . "+ web.title}</Link>
                        </div>                        
                    ))}

                    <hr/>
                <Link to="/home">back</Link>
                </div>
               
            </React.Fragment>
        );
    }
}
 
export default Web;