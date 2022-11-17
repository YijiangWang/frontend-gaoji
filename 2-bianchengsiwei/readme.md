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

### 4、Map & Set
- 对象中的 key 不可以是对象；Map 中的键可以是对象；
- Map 有 size 属性，可以统计对应的键值对个数，object 没有；
- Set 最大的特点是不会有重复元素；
- 如果 Object 中有频繁的增删改查操作，此时用 Map 可以提高性能。

##### 4.1、Map & WeakMap
- Map：有 get、set、has、delete、clear 方法 和 size 属性;
- new Map([val])：val 必须要是对象，如果是其它值会报错；
- WeakMap 键名只能是对象（这里需要排除 null）；其次，WeakMap的键名所指向的对象（弱引用），不计入垃圾回收机制，其他位置对该对象的引用一旦消除，该对象占用的内存就会被垃圾回收机制释放。WeakMap 保存的这个键值对，也会自动消失。弱引用关系，最终会被垃圾回收机制回收，性能更好一些：   
- WeakMap 没有遍历操作（keys()、values()、entries()），也没有 size 属性；
- WeakMap 只有 get、set、has、delete 四个方法。
```js
  let m = new Map();

  let container = {
    key: {}
  };

  m.set(container.key, 'Val');
  container.key = null;
  console.log(container);
  console.log(m)
  // {key: null}
  // {Object => 'val'}
```
```js
  let vm = new WeakMap();

  let container = {
    key: {}
  };

  vm.set(container.key, 'VMVal')
  container.key = null;
  console.log(container);
  console.log(vm);
  // {key: null}
  // 无属性: No properties
```   
```js
  let m = new Map();
  let vm = new WeakMap();

  let container = {
    key: {}
  };

  m.set(container.key, 'Val');
  vm.set(container.key, 'VMVal')
  container.key = null;
  console.log(container);
  console.log(m)
  console.log(vm);
  // {key: null}
  // {Object => 'val'}
  // {Object => 'VMVal}
```  

##### 4.2.Set & WeakSet
- 值只能为对象，不能为其它类型的值
- WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中；
- 没有 size 属性
```js
  let s = new Set([1,2,3,3,{a:2},{a:2}]);
  console.log(s)
  console.log(s.size)
  // { 1, 2, 3, { a: 2 }, { a: 2 } }
  // 5
```
- Set 拥有的方法，有 clear、delete、has、add 以及 size 属性；
```js
  // 数组去重
  [...new Set([1,2,3,4,4,5,5,6])];
  Array.from(new Set([1,2,3,4,4,5,5,6]));

  // 字符串去重
  [...new Set('Hellohello')].join('');
  console.log([...new Set('Hellohello')].join(''));

  // s.clear()
  console.log(s.has(9));
  console.log(s);
```
- WeakSet

### 5、Symbol：唯一标识符
```js
  let s1 = Symbol(1);
  let s2 = Symbol(2);
  console.log(s1==s2);
  // false
```
- 用途：定制一些私有的属性
```js
  let obj = {
    [Symbol(1)]: 'val',
    name: 'yjw' 
  }
  // 但是也可以通过一些手段获取
  let res = Object.getOwnPropertySymbols(obj);
  console.log(obj[res[0]]);
  // val
```

### 6、箭头函数
- 自带 return；
- 书写更简单；
- 没有 this 绑定，使用的是外层的 this；