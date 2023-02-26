import React, { Component } from 'react';
import Boxes from './boxes';
import NavBar from './navbar';
class App extends Component {
    state = {  
        boxes:[
            {id:1,x:1},
            {id:2,x:2},
            {id:3,x:3},
            {id:4,x:4},
        ]
    } 

    constructor(){
        super();
        console.log("app-constructor");
    }
    componentDidMount(){
        console.log("app-mount");
        
    }

    handleClickLeft =(box)=>{
        //这种API会让render函数重新调用
        // this.setState({
        //     x:this.state.x - step
        // })
        // console.log("left",this)
        
        const boxes = [...this.state.boxes];
        const k = boxes.indexOf(box);
        boxes[k] = {...boxes[k]};
        boxes[k].x--;
        this.setState({
            boxes:boxes
        })
    }
    handleClickRight = (box) =>{  
        // this.state.x ++; //这样直接改值,并不会调用render函数
        // this.setState({
        //     x:this.state.x + step
        // })
        // console.log("right",this)

        const boxes = [...this.state.boxes];
        const k = boxes.indexOf(box);
        boxes[k] = {...boxes[k]};
        boxes[k].x++;
        this.setState({
            boxes:boxes
        })
    }

    handleDelele = (boxId) =>{
       console.log("delete",boxId);
       const boxes = this.state.boxes.filter(box => box.id !== boxId)
        this.setState({boxes:boxes});
    }

    handleReset = () =>{
        const boxes = this.state.boxes.map(b => {
            return{
                id:b.id,
                x:0,
            }
        });
        this.setState({boxes:boxes});
    }

    render() { 
        console.log("app render")
        return (
            <React.Fragment>
                <NavBar boxesCount = {this.state.boxes.filter(p=>p.x !==0).length}></NavBar>
                <div className='container'>
                    <Boxes
                        boxes={this.state.boxes}
                        onReset = {this.handleReset}
                        onClickLeft = {this.handleClickLeft}
                        onClickRight = {this.handleClickRight}
                        onDelete = {this.handleDelele}
                    ></Boxes>
                </div>
            </React.Fragment>
        );
    }
}
 
export default App;