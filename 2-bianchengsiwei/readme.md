# 一、ES6 注意点
### 1、let、const
- const 声明一个对象obj，不能直接给obj赋值，但是可以通过点来修改对象内的值；
- 要使变量obj的值不能被改变，可以使用 Object.freeze(obj) 来冻结obj，此时通过点来修改obj内的值，不报错，但是不会被修改；
- 注：freeze 只能冻结第一层，深层次的值仍然可以被修改；

- 如果深层次的值也不让修改，只能自己实现：
```js
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
```

### 2、解构赋值
- 通过冒号 ':' 修改名称，当有多层时按照原有结构结构即可；
```js
const obj2 = {
  name: 'yjw',
  age: 20,
  hobby: {
    ball: 'basketball',
    sport: 'walk'
  }
}
const {name: myName, age, hobby: {ball, sport: sports}} = obj2;
console.log(myName, age, ball, sports);
```

### 3、展开运算符 `...`
- 合并多个数组或者对象；
- 获取函数参数：
```js
  function test(...rest) {
    console.log(rest);
  }
  test(1,2,3);
```