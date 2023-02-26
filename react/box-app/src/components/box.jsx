import React, { Component } from 'react'


class Box extends Component {
    //组件内的局部变量
    // state = { 
    //     x:this.props.x,
    //     color:['red','green','blue']
    //  } 
     /*
     React 数据驱动视图的原理:
     1.react自身维护一个虚拟dom树V,当数据修改时,dom树V修改,判断真实dom树是否一致,
     若是不一致,那么修改真实dom树
     2.数据变换后,render函数会被执行
      */
     
    

    handleClickRightTmp = () =>{
        return this.handleClickRight(100);
    }
    render() { 
        console.log(this.props)
        return (
        <React.Fragment>
            <div style = {this.getStyles()}>{this.toString()}</div>
            <button onClick={()=>{return this.props.onClickLeft()}} className="btn btn-primary m-2">left</button>
            <button onClick={()=>{return this.props.onClickRight()}} className="btn btn-success m-2">right</button>
            <button onClick={()=>this.props.onDelete(this.props.box.id)} className="btn btn-danger m-2">Delete</button>
        </React.Fragment>
        );
    }

    getStyles(){
        let styles = {
                width :"50px",
                height:"50px",
                backgroundColor:"lightblue",
                color:"white",
                textAlign:"center",
                lineHeight:"50px",
                borderRadius:"5px",
                marginLeft:this.props.box.x,
        };
        if(this.props.box.x ===0){
            styles.backgroundColor = "orange";
        }
        return styles;
    }

    toString(){
        const {x} = this.props.box;
        return `x:${x}`;
    }
}
 
export default Box;