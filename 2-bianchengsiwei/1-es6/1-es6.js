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
// console.log(obj2.size, map.size);

// =======weakmap
// 键名只能是对象；弱引用关系，最终会被垃圾回收机制回收，性能更好一些
let m = new Map();
let vm = new WeakMap();

let container = {
  key: {name:'yjw'}
};

m.set(container.key, 'Val');
vm.set(container.key, 'VMVal')
container.key = null;
// console.log(container)
// console.log(m)
// console.log(vm);

// ========Set
let s = new Set([1,2,3,3,{a:2},{a:2}]);
// console.log(s);
// console.log(s.size);
// { 1, 2, 3, { a: 2 }, { a: 2 } }
// 5

// 数组去重
[...new Set([1,2,3,4,4,5,5,6])];
Array.from(new Set([1,2,3,4,4,5,5,6]));

// 字符串去重
[...new Set('Hellohello')].join('');
// console.log([...new Set('Hellohello')].join(''));

// s.clear()
// console.log(s.has(9));
// console.log(s);

// ======WeakSet
// console.log(new WeakSet([{a:1,b:2}]))

// =========Symbol
let s1 = Symbol(1);
let s2 = Symbol(2);
// console.log(s1==s2);
// false

let obj5 = {
  [Symbol(1)]: 'val',
  name: 'yjw' 
}
let res = Object.getOwnPropertySymbols(obj5);
// console.log(obj5[res[0]]);