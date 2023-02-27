import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/app'

//构建对state操作的函数f1
//其中如果state支持我们定义的操作，那么可以通过传入的操作进行修改，否则不行
//我们抱有的目的是：f1可以维护state，维护方法是通过传入的action来判断，是否对数据进行修改
const f1 = (state = 0,action) =>{
  switch(action.type){
    case 'add':
      return state+action.value;
    case 'sub':
      return state-action.value;
    default:
      return state;
  }
};

const f2 = (state=":",action)=>{
  switch(action.type){
    case 'concat':
      return state+action.character;
    default:
      return state;
  }
}

//实现将f1和f2作为子，放到f3中
// const f3 = (state={},action)=>{
//   return {
//     f1:f1(state.f1,action),
//     f2:f2(state.f2,action),
//   }
// }

//等价于上面注释的写法
const f3 = combineReducers({
  //将每个节点上的操作函数改名为number
  number:f1,
  //将每个节点上的操作函数改名为string
  string:f2,
})

//构建一个state数，store是根结点
const store = configureStore(
  {
    reducer:f3,
  }
);

//此api的作用是，dfs方式调用以store为根中的state树上的reducer函数
store.dispatch({type:"add",value:30});

//每次调用dispatch方法后，就执行其中的参数
store.subscribe(()=>{
  console.log(store.getState());
})

store.dispatch({type:"add",value:30});
store.dispatch({type:"sub",value:30});
store.dispatch({type:"add",value:100});
store.dispatch({type:"sub",value:30});
store.dispatch({type:"concat",character:'cs'});


//console.log(store.getState());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //将store树定义到整个provider上，就是store数据树改变后，App会重新刷新
  <Provider store={store}>
    <App></App>
  </Provider>
)
