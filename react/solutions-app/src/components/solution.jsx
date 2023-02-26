import React, { Component } from 'react';

class Solution  extends Component {
    state = {
        solutions:[
            {key:10,number:1611,title:"哈哈哈哈1",views:114514},
            {key:11,number:1621,title:"哈哈哈哈2",views:114514},
            {key:12,number:1341,title:"哈哈哈哈3",views:114514},
            {key:13,number:1611,title:"哈哈哈哈4",views:114514},
            {key:14,number:1651,title:"哈哈哈哈5",views:114514},
            {key:15,number:1677,title:"哈哈哈哈6",views:114514},
        ]
      } 

    handleDelete = (s) =>{
        //添加一个过滤,过滤逻辑函数是solution => solution != s
        //将过滤后的结果放到我们定义的常量solutions中
        const solutions = this.state.solutions.filter(solution => solution != s);
        //将state中的数据更新
        this.setState({
            solutions :solutions
        })
    }
    render() { 
        if(this.state.solutions.length === 0){
            return <p>No question</p>
        }
        return (
            
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>标题</th>
                        <th>阅读</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.solutions.map(solution =>(
                        <tr key = {solution.key}>
                            <td>{solution.number}</td>
                            <td>{solution.title}</td>
                            <td>{solution.views}</td>
                            <td><button onClick={()=> this.handleDelete(solution
                                )} className='btn btn-danger'>删除</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
 
export default Solution;