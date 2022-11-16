// ==============let const=============
const obj = {
  name: 'yjw',
  age: 20,
  hobby: {
    ball: 'basketball'
  }
}

// obj = {};
// Object.freeze(obj);
// obj.hobby.ball = 'foot';

function deepFreeze(obj) {
  Object.freeze(obj);
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) { // 自己的属性才可以，继承的不行
      if(typeof obj[key] === 'object') {  // 如果是对象进行遍历
        deepFreeze(obj[key])
      }
    }
  }
}
deepFreeze(obj);
obj.hobby.ball = 'foot';

// console.log(obj);

// ============解构赋值==============
const obj2 = {
  name: 'yjw',
  age: 20,
  hobby: {
    ball: 'basketball',
    sport: 'walk'
  }
}
const {name: myName, age, hobby: {ball, sport: sports}} = obj2;
// console.log(myName, age, ball, sports);

// ==============set map=============
let map = new Map();
map.set('name', 'zhangsan');
map.set('age', 18);
console.log(obj2.size, map.size);