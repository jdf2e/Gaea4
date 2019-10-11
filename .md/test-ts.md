TypeScript 是 JavaScript 的强类型版本。然后在编译期去掉类型和特有语法，生成纯粹的 JavaScript 代码。由于最终在浏览器中运行的仍然是 JavaScript，所以 TypeScript 并不依赖于浏览器的支持，也并不会带来兼容性问题。
TypeScript 是 JavaScript 的超集，这意味着他支持所有的 JavaScript 语法。并在此之上对 JavaScript 添加了一些扩展，如 class / interface / module 等。这样会大大提升代码的可阅读性。
与此同时，TypeScript 也是 JavaScript ES6 的超集，Google 的 Angular 2.0 也宣布采用 TypeScript 进行开发。这更是充分说明了这是一门面向未来并且脚踏实地的语言。
强类型语言的优势在于静态类型检查，具体可以参见 http://www.zhihu.com/question... 的回答。概括来说主要包括以下几点：

静态类型检查
IDE 智能提示
代码重构
可读性

TypeScript的设计目的应该是解决JavaScript的“痛点”：弱类型和没有命名空间，导致很难模块化，不适合开发大型程序。另外它还提供了一些语法糖来帮助大家更方便地实践面向对象的编程。

typescript不仅可以约束我们的编码习惯，还能起到注释的作用，当我们看到一函数后我们立马就能知道这个函数的用法，需要传什么值，返回值是什么类型一目了然，对大型项目的维护性有很大的提升。也不至于使开发者搬起石头砸自己的脚。

