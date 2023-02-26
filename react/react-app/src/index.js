// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
const person = {
  name: "yxc",
  talk: function() {
    console.log(this);
  }
}

person.talk();

const talk = person.talk.bind(person);
talk();

const f = x => x*x;
console.log(f(3));

const person1 = {
  talk:function(){
    setTimeout(function(){
      console.log(this)
    },1000)
  }
}
person1.talk();
const person2 = {
  talk:function(){
    let outer = this;
    setTimeout(function(){
      console.log(outer)
    },1000)
  }
}
person2.talk();
const person3 = {
  talk:function(){
    let outer = this;
    setTimeout(() =>{
      console.log(outer)
    },1000)
  }
}
person3.talk();

const person4 ={
  name :"xxx",
  age : 18,
  height : 180
}

const {name : new_name,age} = person4;

console.log(new_name,age);


let a = [1,2,3];
let b = [4,5,6];
let c = [...a,0,...b,7,8,9]
console.log(c);
let persons = {...person1,...person4,height:222}
console.log(persons);