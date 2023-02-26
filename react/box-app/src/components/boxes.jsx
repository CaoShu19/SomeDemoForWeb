import React, { Component } from 'react';
import Box from './box'



class Boxes extends Component {
   
    // Array.map() 用来遍历数组,内部传入的函数,用来处理各个结果
    render() { 
        return (<React.Fragment>
            <button onClick={()=>{return this.props.onReset()}} style={{marginBottom:"15px"}} className='btn btn-info'>Reset</button>
            {this.props.boxes.map(box => (
                <Box 
                    //这里定义的属性,能够被props接受到
                    key={box.id}
                    box = {box}
                    onDelete = {this.props.onDelete}
                    onClickLeft = {()=>this.props.onClickLeft(box)}
                    onClickRight = {()=>this.props.onClickRight(box)}
                />
            ))}
        </React.Fragment>);
    }
}
 
export default Boxes;