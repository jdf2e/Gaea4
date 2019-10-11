Flow基本语法
```
function sum(a: number, b:number) {
  return a + b;
}
```
我们可以看到多了一个number的限制，标明对a和b只能传递数字类型的，否则的话用Flow工具检测会报错。其实这里大家可能有疑问，这么写还是js吗？ 浏览器还能认识执行吗？当然不认识了，所以需要翻译或者说编译。其实现在前端技术发展太快了，各种插件层出不穷--Babel、Typescript等等，其实都是将一种更好的写法编译成浏览器认识的javascript代码（我们以前都是写浏览器认识的javascript代码的）。我们继续说Flow的事情，在Vue源码中其实出现的Flow语法都比较好懂，比如下面这个函数的定义：

```
export function renderList (
  val: any,
  render: (
    val: any,
    keyOrIndex: string | number,
    index?: number
  ) => VNode
): ?Array<VNode>{
...
}
```
val是any代表可以传入的类型是任何类型， keyOrIndex是string|number类型，代表要不是string类型，要不是number，不能是别的；index?:number这个我们想想正则表达式中？的含义---0个或者1个，这里其实意义也是一致的，但是要注意?的位置是在冒号之前还是冒号之后--因为这两种可能性都有，上面代码中问号是跟在冒号前面，代表index可以不传，但是传的话一定要传入数字类型；如果问号是在冒号后面的话，则代表这个参数必须要传递，但是可以是数字类型也可以是空。这样是不是顿时感觉严谨多了？同时，代码意义更明确了。为啥这么说呢？ 之前看打包后的vue源码，其中看到观察者模式实现时由于没有类型十分难看懂，但是看了这个Flow版本的源码，感觉容易懂。

Vue中的组件相信大家都使用过，并且组件之中可以有子组件，那么这里就涉及到父子组件了。组件其实初始化过程都是一样的，显然有些方法是可以继承的。Vue代码中是使用原型继承的方式实现父子组件共享初始化代码的。所以，要看懂这里，需要了解js中原型的概念；这里不多谈，只是提供几个学习资料供大家参考：

Object.defineProperty
这个方法在js中十分强大，Vue正是使用了它实现了响应式数据功能。我们先瞄一眼Vue中定义响应式数据的代码：
```
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  .....
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```