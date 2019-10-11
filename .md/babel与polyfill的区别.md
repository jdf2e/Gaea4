preset与plugin的关系:
preset中已经包含了一组用来转换ES6+的语法的插件,如果只使用少数新特性而非大多数新特性,可以不使用preset而只使用对应的转换插件

babel默认只转换语法,而不转换新的API,如需使用新的API,还需要使用对应的转换插件或者polyfill

例如，默认情况下babel可以将箭头函数，class等语法转换为ES5兼容的形式，但是却不能转换Map，Set，Promise等新的全局对象，这时候就需要使用polyfill去模拟这些新特性

使用转换插件: babel-plugin-transform-xxx

使用方法

缺啥补啥,在package.json添加所需的依赖babel-plugin-transform-xxx

在.babelrc中的plugins项指定使用babel-plugin-transform-xxx插件
代码中不需要显式import/require, .babelrc中不需要指定useBuiltIns, webpack.config.js中不需要做额外处理,一切由babel插件完成转换


优点

作用域是模块,避免全局冲突
是按需引入,避免不必要引入造成及代码臃肿

缺点

每个模块内单独引用和定义polyfill函数,造成了重复定义,使代码产生冗余

配置完一个转换插件后, 代码中每个使用这个API的地方的代码都会被转换成使用polyfill中实现的代码


