import React, { Component } from 'react';
import { connect } from 'react-redux';


class Number extends Component {
    state = {  } 
    handleClick = () =>{
        this.props.concat('y');
    }
    render() { 
        return (
            <React.Fragment>
                <h3>Number:</h3>
                <div>{this.props.number}</div>
                <button onClick={this.handleClick}>add</button>
            </React.Fragment>
        );
    }
}
 
const mapStateToProps = (state,props) =>{
    return {
        number:state.number,
    }
}

const mapDispatchToProps = {
    //不仅仅是组件中的函数
    //其次，这个函数的返回值，还会作用到store树上的所有reducer函数上
    //也就是说，会将返回值当作参数，传入reducer来执行。
    concat: (c)=>{
        return{
            type:"concat",
            character:c,
        }
    }
}


//用connect将Number组件包装成一个新的组件
//这个新的组件会将connect中的函数逻辑执行
//比如说，将state.number（这是redux中的数据树的节点上的数据）绑定到当前组件的props属性上的number上
export default connect(mapStateToProps,mapDispatchToProps)(Number);