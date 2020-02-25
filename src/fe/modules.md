# 模块化的前世今生

## 背景

随着前端项目的越来越庞大，组件化的前端框架，前端路由等技术的发展，模块化已经成为现代前端工程师的一项必备技能。无论是什么语言一旦发展到一定地步，其工程化能力和可维护性势必得到相应的发展。

模块化这件事，无论在哪个编程领域都是相当常见的事情，模块化存在的意义就是为了增加可复用性，以尽可能少的代码是实现个性化的需求。同为前端三剑客之一的 CSS 早在 2.1 的版本就提出了 `@import` 来实现模块化，但是 JavaScript 直到 ES6 才出现官方的模块化方案： ES Module (`import`、`export`)。尽管早期 JavaScript 语言规范上不支持模块化，但这并没有阻止 JavaScript 的发展，官方没有模块化标准开发者们就开始自己创建规范，自己实现规范。

## CommonJS 的出现

十年前的前端没有像现在这么火热，模块化也只是使用闭包简单的实现一个命名空间。2009 年对 JavaScript 无疑是重要的一年，新的 JavaScript 引擎 (v8) ，并且有成熟的库 (jQuery、YUI、Dojo)，ES5 也在提案中，然而 JavaScript 依然只能出现在浏览器当中。早在2007年，AppJet 就提供了一项服务，创建和托管服务端的 JavaScript 应用。后来 Aptana 也提供了一个能够在服务端运行 Javascript 的环境，叫做 Jaxer。网上还能搜到关于 AppJet、Jaxer 的博客，甚至 Jaxer 项目还在[github](https://github.com/aptana/Jaxer)上。

![Jaxer](https://file.shenfq.com/q17a5.png)

但是这些东西都没有发展起来，Javascript 并不能替代传统的服务端脚本语言 (PHP、Python、Ruby) 。尽管它有很多的缺点，但是不妨碍有很多人使用它。后来就有人开始思考 JavaScript 要在服务端运行还需要些什么？于是在 2009 年 1 月，Mozilla 的工程师 [Kevin Dangoor](http://www.kevindangoor.com/) 发起了 CommonJS 的提案，呼吁 JavaScript 爱好者联合起来，编写 JavaScript 运行在服务端的相关规范，一周之后，就有了 224 个参与者。

> "[This] is not a technical problem,It's a matter of people getting together and making a decision to step forward and start building up something bigger and cooler together."

CommonJS 标准囊括了 JavaScript 需要在服务端运行所必备的基础能力，比如：模块化、IO 操作、二进制字符串、进程管理、Web网关接口 (JSGI) 。但是影响最深远的还是 CommonJS 的模块化方案，CommonJS 的模块化方案是JavaScript社区第一次在模块系统上取得的成果，不仅支持依赖管理，而且还支持作用域隔离和模块标识。再后来 node.js 出世，他直接采用了 `CommonJS` 的模块化规范，同时还带来了npm (Node Package Manager，现在已经是全球最大模块仓库了) 。

CommonJS 在服务端表现良好，很多人就想将 CommonJS 移植到客户端 (也就是我们说的浏览器) 进行实现。由于CommonJS 的模块加载是同步的，而服务端直接从磁盘或内存中读取，耗时基本可忽略，但是在浏览器端如果还是同步加载，对用户体验极其不友好，模块加载过程中势必会向服务器请求其他模块代码，网络请求过程中会造成长时间白屏。所以从 CommonJS 中逐渐分裂出来了一些派别，在这些派别的发展过程中，出现了一些业界较为熟悉方案 AMD、CMD、打包工具（Component/Browserify/Webpack）。

## AMD规范：RequireJS

![RequireJS logo](https://file.shenfq.com/fy5v1.png)

RequireJS 是 AMD 规范的代表之作，它之所以能代表 AMD 规范，是因为 RequireJS 的作者 (James Burke) 就是 AMD 规范的提出者。同时作者还开发了[ `amdefine`](https://github.com/jrburke/amdefine)，一个让你在 node 中也可以使用 AMD 规范的库。

AMD 规范由 CommonJS 的 Modules/Transport/C 提案发展而来，毫无疑问，Modules/Transport/C 提案的发起者就是 James Burke。

James Burke 指出了 CommonJS 规范在浏览器上的一些不足：

1. 缺少模块封装的能力：CommonJS 规范中的每个模块都是一个文件。这意味着每个文件只有一个模块。这在服务器上是可行的，但是在浏览器中就不是很友好，浏览器中需要做到尽可能少的发起请求。
2. 使用同步的方式加载依赖：虽然同步的方法进行加载可以让代码更容易理解，但是在浏览器中使用同步加载会导致长时间白屏，影响用户体验。
3. CommonJS 规范使用一个名为 `export` 的对象来暴露模块，将需要导出变量附加到 `export` 上，但是不能直接给该对象进行赋值。如果需要导出一个构造函数，则需要使用 `module.export`，这会让人感到很疑惑。

AMD 规范定义了一个 `define` 全局方法用来定义和加载模块，当然 RequireJS 后期也扩展了 `require` 全局方法用来加载模块 。通过该方法解决了在浏览器使用 CommonJS 规范的不足。

```javascript
define(id?, dependencies?, factory);
```

1. 使用匿名函数来封装模块，并通过函数返回值来定义模块，这更加符合 JavaScript 的语法，这样做既避免了对 `exports`变量的依赖，又避免了一个文件只能暴露一个模块的问题。

2. 提前列出依赖项并进行异步加载，这在浏览器中，这能让模块开箱即用。

   ```javascript
   define("foo", ["logger"], function (logger) {
       logger.debug("starting foo's definition")
       return {
           name: "foo"
       }
   })
   ```

3. 为模块指定一个模块 ID (名称) 用来唯一标识定义中模块。此外，AMD的模块名规范是 CommonJS 模块名规范的超集。

   ```javascript
   define("foo", function () {
       return {
           name: 'foo'
       }
   })
   ```

### RequireJS 原理

在讨论原理之前，我们可以先看下 RequireJS 的基本使用方式。

- 模块信息配置：

  ```javascript
  require.config({
    paths: {
      jquery: 'https://code.jquery.com/jquery-3.4.1.js'
    }
  })
  ```

- 依赖模块加载与调用：

  ```javascript
  require(['jquery'], function ($){
    $('#app').html('loaded')
  })
  ```

- 模块定义：

  ```javascript
  if ( typeof define === "function" && define.amd ) {
    define( "jquery", [], function() {
      return jQuery;
    } );
  }
  ```

我们首先使用 `config` 方法进行了 jquery 模块的路径配置，然后调用 `require` 方法加载 jquery 模块，之后在回调中调用已加载完成的 `$` 对象。在这个过程中，jquery 会使用 `define` 方法暴露出我们所需要的 `$` 对象。

在了解了基本的使用过程后，我们就继续深入 RequireJS 的原理。

#### 模块信息配置

模块信息的配置，其实很简单，只用几行代码就能实现。定义一个全局对象，然后使用 `Object.assign` 进行对象扩展。

```javascript
// 配置信息
const cfg = { paths: {} }

// 全局 require 方法
req = require = () => {}

// 扩展配置
req.config = config => {
  Object.assign(cfg, config)
}
```

#### 依赖模块加载与调用

`require` 方法的逻辑很简单，进行简单的参数校验后，调用 `getModule` 方法对 `Module` 进行了实例化，getModule 会对已经实例化的模块进行缓存。因为 require 方法进行模块实例的时候，并没有模块名，所以这里产生的是一个匿名模块。Module 类，我们可以理解为一个模块加载器，主要作用是进行依赖的加载，并在依赖加载完毕后，调用回调函数，同时将依赖的模块逐一作为参数回传到回调函数中。

```javascript
// 全局 require 方法
req = require = (deps, callback) => {
  if (!deps && !callback) {
    return
  }
  if (!deps) {
    deps = []
  }
  if (typeof deps === 'function') {
    callback = deps
    deps = []
  }
  const mod = getModule()
  mod.init(deps, callback)
}

let reqCounter = 0
const registry = {} // 已注册的模块

// 模块加载器的工厂方法
const getModule = name => {
  if (!name) {
    // 如果模块名不存在，表示为匿名模块，自动构造模块名
    name = `@mod_${++reqCounter}`
  }
  let mod = registry[name]
  if (!mod) {
    mod = registry[name] = new Module(name)
  }
  return mod
}
```

模块加载器是是整个模块加载的核心，主要包括 `enable` 方法和 `check` 方法。

模块加载器在完成实例化之后，会首先调用 `init` 方法进行初始化，初始化的时候传入模块的依赖以及回调。

```javascript
// 模块加载器

class Module {
  constructor(name) {
    this.name = name
    this.depCount = 0
    this.depMaps = []
    this.depExports = []
    this.definedFn = () => {}
  }
  init(deps, callback) {
    this.deps = deps
    this.callback = callback
    // 判断是否存在依赖
    if (deps.length === 0) {
      this.check()
    } else {
      this.enable()
    }
  }
}

```

`enable` 方法主要用于模块的依赖加载，该方法的主要逻辑如下：

1. 遍历所有的依赖模块；

2. 记录已加载模块数 (`this.depCount++`)，该变量用于判断依赖模块是否全部加载完毕；

3. 实例化依赖模块的模块加载器，并绑定 `definedFn` 方法；

   > `definedFn` 方法会在依赖模块加载完毕后调用，主要作用是获取依赖模块的内容，并将 `depCount` 减 1，最后调用 `check` 方法 (该方法会判断 `depCount` 是否已经小于 1，以此来界定依赖全部加载完毕)；

4. 最后通过依赖模块名，在配置中获取依赖模块的路径，进行模块加载。

```javascript
class Module {
  ...
  // 启用模块，进行依赖加载
  enable() {
    // 遍历依赖
    this.deps.forEach((name, i) => {
      // 记录已加载的模块数
      this.depCount++
      
      // 实例化依赖模块的模块加载器，绑定模块加载完毕的回调
      const mod = getModule(name)
      mod.definedFn = exports => {
        this.depCount--
        this.depExports[i] = exports
        this.check()
      }
      
      // 在配置中获取依赖模块的路径，进行模块加载
      const url = cfg.paths[name]
      loadModule(name, url)
    });
  }
  ...
}

```

`loadModule` 的主要作用就是通过 url 去加载一个 js 文件，并绑定一个 onload 事件。onload 会重新获取依赖模块已经实例化的模块加载器，并调用 `init` 方法。

```javascript
// 缓存加载的模块
const defMap = {}

// 依赖的加载
const loadModule =  (name, url) => {
  const head = document.getElementsByTagName('head')[0]
  const node = document.createElement('script')
  node.type = 'text/javascript'
  node.async = true
  // 设置一个 data 属性，便于依赖加载完毕后拿到模块名
  node.setAttribute('data-module', name)
  node.addEventListener('load', onScriptLoad, false)
  node.src = url
  head.appendChild(node)
  return node
}

// 节点绑定的 onload 事件函数
const onScriptLoad = evt => {
  const node = evt.currentTarget
  node.removeEventListener('load', onScriptLoad, false)
  // 获取模块名
  const name = node.getAttribute('data-module')
  const mod = getModule(name)
  const def = defMap[name]
  mod.init(def.deps, def.callback)
}

```

看到之前的案例，因为只有一个依赖 (jQuery)，并且 jQuery 模块并没有其他依赖，所以 `init` 方法会直接调用 `check` 方法。这里也可以思考一下，如果是一个有依赖项的模块后续的流程是怎么样的呢？

```javascript
define( "jquery", [] /* 无其他依赖 */, function() {
  return jQuery;
} );

```

`check` 方法主要用于依赖检测，以及调用依赖加载完毕后的回调。

```javascript
// 模块加载器
class Module {
  ...
  // 检查依赖是否加载完毕
  check() {
    let exports = this.exports
    //如果依赖数小于1，表示依赖已经全部加载完毕
    if (this.depCount < 1) { 
      // 调用回调，并获取该模块的内容
      exports = this.callback.apply(null, this.depExports)
      this.exports = exports
      //激活 defined 回调
      this.definedFn(exports)
    }
  }
  ...
}

```

最终通过 `definedFn` 重新回到被依赖模块，也就是最初调用 `require` 方法实例化的匿名模块加载器中，将依赖模块暴露的内容存入 `depExports` 中，然后调用匿名模块加载器的 `check` 方法，调用回调。

```javascript
mod.definedFn = exports => {
  this.depCount--
  this.depExports[i] = exports
  this.check()
}

```

#### 模块定义

还有一个疑问就是，在依赖模块加载完毕的回调中，怎么拿到的依赖模块的依赖和回调呢？

```javascript
const def = defMap[name]
mod.init(def.deps, def.callback)

```

答案就是通过全局定义的 `define` 方法，该方法会将模块的依赖项还有回调存储到一个全局变量，后面只要按需获取即可。

```javascript
const defMap = {} // 缓存加载的模块
define = (name, deps, callback) => {
  defMap[name] = { name, deps, callback }
}

```

### 总结

最后可以发现，RequireJS 的核心就在于模块加载器的实现，不管是通过 `require` 进行依赖加载，还是使用 `define` 定义模块，都离不开模块加载器。

感兴趣的可以在我的github上查看关于简化版 RequrieJS 的[完整代码](https://github.com/Shenfq/think-modular/blob/master/requirejs/fake/require.js) 。

## CMD规范：sea.js

![sea.js logo](https://file.shenfq.com/zvenl.png)

CMD 规范由国内的开发者玉伯提出，尽管在国际上的知名度远不如 AMD ，但是在国内也算和 AMD 齐头并进。相比于 AMD 的异步加载，CMD 更加倾向于懒加载，而且 CMD 的规范与 CommonJS 更贴近，只需要在 CommonJS 外增加一个函数调用的包装即可。

```javascript
define(function(require, exports, module) {
  require("./a").doSomething()
  require("./b").doSomething()
})


```

作为 CMD 规范的实现 sea.js 也实现了类似于 RequireJS 的 api：

```javascript
seajs.use('main', function (main) {
  main.doSomething()
})


```

sea.js 在模块加载的方式上与 RequireJS 一致，都是通过在 head 标签插入 script 标签进行加载的，但是在加载顺序上有一定的区别。要讲清楚这两者之间的差别，我们还是直接来看一段代码：

**RequireJS** :

```javascript
// RequireJS
define('a', function () {
  console.log('a load')
  return {
    run: function () { console.log('a run') }
  }
})

define('b', function () {
  console.log('b load')
  return {
    run: function () { console.log('b run') }
  }
})

require(['a', 'b'], function (a, b) {
  console.log('main run')
  a.run()
  b.run()
})


```

![requirejs result](https://file.shenfq.com/p1k7d.png)

**sea.js** :

```javascript
// sea.js
define('a', function (require, exports, module) {
  console.log('a load')
  exports.run = function () { console.log('a run') }
})

define('b', function (require, exports, module) {
  console.log('b load')
  exports.run = function () { console.log('b run') }
})

define('main', function (require, exports, module) {
  console.log('main run')
  var a = require('a')
  a.run()
  var b = require('b')
  b.run()
})

seajs.use('main')


```

![sea.js result](https://file.shenfq.com/f6b8p.png)

可以看到 sea.js 的模块属于懒加载，只有在 require 的地方，才会真正运行模块。而 RequireJS，会先运行所有的依赖，得到所有依赖暴露的结果后再执行回调。

正是因为懒加载的机制，所以 sea.js 提供了 `seajs.use` 的方法，来运行已经定义的模块。所有 define 的回调函数都不会立即执行，而是将所有的回调函数进行缓存，只有 use 之后，以及被 require 的模块回调才会进行执行。

### sea.js 原理

下面简单讲解一下 sea.js 的懒加载逻辑。在调用 define 方法的时候，只是将 模块放入到一个全局对象进行缓存。

```javascript
const seajs = {}
const cache = seajs.cache = {}

define = (id, factory) => {
  const uri = id2uri(id)
  const deps = parseDependencies(factory.toString())
  const mod = cache[uri] || (cache[uri] = new Module(uri))
  mod.deps = deps
  mod.factory = factory
  
}

class Module {
  constructor(uri, deps) {
    this.status = 0
    this.uri    = uri
    this.deps   = deps
  }
}


```

这里的 Module，是一个与 RequireJS 类似的模块加载器。后面运行的 seajs.use 就会从缓存取出对应的模块进行加载。

> 注意：这一部分代码只是简单介绍 use 方法的逻辑，并不能直接运行。

```javascript
let cid = 0
seajs.use = (ids, callback) => {
  const deps = isArray(ids) ? ids : [ids]
  
  deps.forEach(async (dep, i) => {
    const mod = cache[dep]
    mod.load()
  })
}


```

另外 sea.js 的依赖都是在 factory 中声明的，在模块被调用的时候，sea.js 会将 factory 转成字符串，然后匹配出所有的 `require('xxx')` 中的 `xxx` ，来进行依赖的存储。前面代码中的 `parseDependencies` 方法就是做这件事情的。

早期 sea.js 是直接通过正则的方式进行匹配的：

```javascript
const parseDependencies = (code) => {
  const REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g
  const SLASH_RE = /\\\\/g
  const ret = []

  code
    .replace(SLASH_RE, '')
    .replace(REQUIRE_RE, function(_, __, id) {
      if (id) {
        ret.push(id)
      }
    })
  return ret
}


```

但是后来发现正则有各种各样的 bug，并且过长的正则也不利于维护，所以 sea.js 后期舍弃了这种方式，转而使用状态机进行词法分析的方式获取 require 依赖。

详细代码可以查看 sea.js 相关的子项目：[crequire](https://github.com/seajs/crequire)。

### 总结

其实 sea.js 的代码逻辑大体上与 RequireJS 类似，都是通过创建 script 标签进行模块加载，并且都有实现一个模块记载器，用于管理依赖。

主要差异在于，sea.js 的懒加载机制，并且在使用方式上，sea.js 的所有依赖都不是提前声明的，而是 sea.js 内部通过正则或词法分析的方式将依赖手动进行提取的。

感兴趣的可以在我的github上查看关于简化版 sea.js 的[完整代码](https://github.com/Shenfq/think-modular/blob/master/seajs/fake/sea.js)。

## ES Module

ES Module 是 ES 组织官方推出的模块化方案，天生自带光环，相比于 CommonJS 和 AMD 方案，ESM采用了完全静态化的方式进行模块的加载，静态化也为后来的打包工具提供了便利，并且能友好的支持 tree shaking。下面来看看 ESM 的基本语法。

### 模块导出

模块导出只有一个关键词：`export`，最简单的方法就是在声明的变量前面直接加上 export 关键词。

```js
export const name = 'Shenfq'

```

可以在 const、let、var 前直接加上 export，也可以在 function 或者 class 前面直接加上 export。

```js
export function getName() {
  return name
}
export class Logger {
	log(...args) {
    console.log(...args)
  }
}

```

上面的导出方法也可以使用大括号的方式进行简写。

```js
const name = 'Shenfq'
function getName() {
  return name
}
class Logger {
	log(...args) {
    console.log(...args)
  }
}

export { name, getName, Logger }

```

最后一种语法，也是我们经常使用的，导出默认模块。

```js
const name = 'Shenfq'
export default name

```



### 模块导入

模块的导入使用`import`，并配合 `from` 关键词。

```js
// main.js
import name from './module.js'

// module.js
const name = 'Shenfq'
export default name

```

这样直接导入的方式，`module.js` 中必须使用 `export default`，也就是说 import 语法，默认导入的是`default`模块。如果想要导入其他模块，就必须使用对象展开的语法。

```js
// main.js
import { name, getName } from './module.js'

// module.js
export const name = 'Shenfq'
export const getName = () => name


```

如果模块文件同时导出了默认模块，和其他模块，在导入时，也可以同时将两者导入。

```js
// main.js
import name, { getName } from './module.js'

//module.js
const name = 'Shenfq'
export const getName = () => name
export default name


```


当然，ESM 也提供了重命名的语法，将导入的模块进行重新命名。

```js
// main.js
import * as mod from './module.js'
let name = ''
name = mod.name
name = mod.getName()

// module.js
export const name = 'Shenfq'
export const getName = () => name


```

上述写法就相当于于将模块导出的对象进行重新赋值：

```js
// main.js
import { name, getName } from './module.js'
const mod = { name, getName }


```

同时也可以对单独的变量进行重命名：

```js
// main.js
import { name, getName as getModName }


```



### 导入同时进行导出

如果有两个模块 a 和 b ，同时引入了模块 c，但是这两个模块还需要导入模块 d，如果模块 a、b 在导入 c 之后，再导入 d 也是可以的，但是有些繁琐，我们可以直接在模块 c 里面导入模块 d，再把模块 d 暴露出去。

![模块关系](https://file.shenfq.com/ys5my.png)

```js
// module_c.js
import { name, getName } from './module_d.js'
export { name, getName }


```

这么写看起来还是有些麻烦，这里 ESM 提供了一种将 import 和 export 进行结合的语法。

```js
export { name, getName } from './module_d.js'


```

上面是 ESM 规范的一些基本语法，如果想了解更多，可以翻阅阮老师的 [《ES6 入门》](http://es6.ruanyifeng.com/#docs/module)。

### ESM 与 CommonJS 的差异

说到两者的差异，首先肯定是语法上的差异，前面也已经简单介绍过了，一个使用 `import/export` 语法，一个使用 `require/module` 语法。

另一个 ESM 与 CommonJS 显著的差异在于，ESM 导入模块的变量都是强绑定，导出模块的变量一旦发生变化，对应导入模块的变量也会跟随变化，而 CommonJS 中导入的模块都是值传递与引用传递，类似于函数传参（基本类型进行值传递，相当于拷贝变量，非基础类型【对象、数组】，进行引用传递）。

下面我们看下详细的案例：

**CommonJS**

```js
// a.js
const mod = require('./b')

setTimeout(() => {
  console.log(mod)
}, 1000)

// b.js
let mod = 'first value'

setTimeout(() => {
  mod = 'second value'
}, 500)

module.exports = mod


```

```bash
$ node a.js
first value


```

**ESM**

```js
// a.mjs
import { mod } from './b.mjs'

setTimeout(() => {
  console.log(mod)
}, 1000)

// b.mjs
export let mod = 'first value'

setTimeout(() => {
  mod = 'second value'
}, 500)


```

```bash
$ node --experimental-modules a.mjs
# (node:99615) ExperimentalWarning: The ESM module loader is experimental.
second value


```

另外，CommonJS 的模块实现，实际是给每个模块文件做了一层函数包裹，从而使得每个模块获取 `require/module`、`__filename/__dirname` 变量。那上面的 `a.js` 来举例，实际执行过程中 `a.js` 运行代码如下：

```js
// a.js
(function(exports, require, module, __filename, __dirname) {
	const mod = require('./b')
  setTimeout(() => {
    console.log(mod)
  }, 1000)
});


```

而 ESM 的模块是通过 `import/export` 关键词来实现，没有对应的函数包裹，所以在 ESM 模块中，需要使用 `import.meta` 变量来获取 `__filename/__dirname`。`import.meta` 是 ECMAScript 实现的一个包含模块元数据的特定对象，主要用于存放模块的 `url`，而 node 中只支持加载本地模块，所以 url 都是使用 `file:` 协议。

```js
import url from 'url'
import path from 'path'
// import.meta: { url: file:///Users/dev/mjs/a.mjs }
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


```



### ESM加载原理

步骤：

1. Construction（构造）：下载所有的文件并且解析为module records。
2. Instantiation（实例）：把所有导出的变量入内存指定位置（但是暂时还不求值）。然后，让导出和导入都指向内存指定位置。这叫做『linking(链接)』。
3. Evaluation（求值）：执行代码，得到变量的值然后放到内存对应位置。

#### 模块记录

所有的模块化开发，都是从一个入口文件开始，无论是 Node.js 还是浏览器，都会根据这个入口文件进行检索，一步一步找到其他所有的依赖文件。

```js
// Node.js: main.mjs
import Log from './log.mjs'


```

```html
<!-- chrome、firefox -->
<script type="module" src="./log.js"></script>


```

值得注意的是，刚开始拿到入口文件，我们并不知道它依赖了哪些模块，所以必须先通过 js 引擎静态分析，得到一个模块记录，该记录包含了该文件的依赖项。所以，一开始拿到的 js 文件并不会执行，只是会将文件转换得到一个模块记录（module records）。所有的 import 模块都在模块记录的 `importEntries` 字段中记录，更多模块记录相关的字段可以查阅[tc39.es](https://tc39.es/ecma262/#table-38)。

![模块记录](https://file.shenfq.com/mmx2x.png)



#### 模块构造

得到模块记录后，会下载所有依赖，并再次将依赖文件转换为模块记录，一直持续到没有依赖文件为止，这个过程被称为『构造』（construction）。

模块构造包括如下三个步骤：

1. 模块识别（解析依赖模块 url，找到真实的下载路径）；
2. 文件下载（从指定的 url 进行下载，或从文件系统进行加载）；
3. 转化为模块记录（module records）。

对于如何将模块文件转化为模块记录，ESM 规范有详细的说明，但是在构造这个步骤中，要怎么下载得到这些依赖的模块文件，在 ESM 规范中并没有对应的说明。因为如何下载文件，在服务端和客户端都有不同的实现规范。比如，在浏览器中，如何下载文件是属于 HTML 规范（浏览器的模块加载都是使用的 `<script>` 标签）。

虽然下载完全不属于 ESM 的现有规范，但在 `import` 语句中还有一个引用模块的 url 地址，关于这个地址需要如何转化，在 Node 和浏览器之间有会出现一些差异。简单来说，在 Node 中可以直接 import 在 node_modules 中的模块，而在浏览器中并不能直接这么做，因为浏览器无法正确的找到服务器上的 node_modules 目录在哪里。好在有一个叫做 [import-maps](https://github.com/WICG/import-maps) 的提案，该提案主要就是用来解决浏览器无法直接导入模块标识符的问题。但是，在该提案未被完全实现之前，浏览器中依然只能使用 url 进行模块导入。

```html
<script type="importmap">
{
  "imports": {
  	"jQuery": "/node_modules/jquery/dist/jquery.js"
  }
}
</script>
<script type="module">
	import $ from 'jQuery'
  $(function () {
    $('#app').html('init')
  })
</script>

```

下载好的模块，都会被转化为模块记录然后缓存到 `module map` 中，遇到不同文件获取的相同依赖，都会直接在 `module map` 缓存中获取。

```js
// log.js
const log = console.log
export default log

// file.js
export { 
  readFileSync as read,
  writeFileSync as write
} from 'fs'


```

![module map](https://file.shenfq.com/6v59t.png)



#### 模块实例

获取到所有依赖文件并建立好 `module map` 后，就会找到所有模块记录，并取出其中的所有导出的变量，然后，将所有变量一一对应到内存中，将对应关系存储到『模块环境记录』（module environment record）中。当然当前内存中的变量并没有值，只是初始化了对应关系。初始化导出变量和内存的对应关系后，紧接着会设置模块导入和内存的对应关系，确保相同变量的导入和导出都指向了同一个内存区域，并保证所有的导入都能找到对应的导出。

![模块连接](https://file.shenfq.com/64xm4.png)

由于导入和导出指向同一内存区域，所以导出值一旦发生变化，导入值也会变化，不同于 CommonJS，CommonJS 的所有值都是基于拷贝的。连接到导入导出变量后，我们就需要将对应的值放入到内存中，下面就要进入到求值的步骤了。



#### 模块求值

求值步骤相对简单，只要运行代码把计算出来的值填入之前记录的内存地址就可以了。到这里就已经能够愉快的使用 ESM 模块化了。



### ESM进展

因为 ESM 出现较晚，服务端已有 CommonJS 方案，客户端又有 webpack 打包工具，所以 ESM 的推广不得不说还是十分艰难的。

#### 客户端

我们先看看客户端的支持情况，这里推荐大家到 [Can I Use](https://caniuse.com/#feat=es6-module) 直接查看，下图是 `2019/11`的截图。

![Can I use](https://file.shenfq.com/1147w.png)

目前为止，主流浏览器都已经支持 ESM 了，只需在 `script` 标签传入指定的 `type="module"` 即可。

```html
<script type="module" src="./main.js"></script>


```

另外，我们知道在 Node.js 中，要使用 ESM 有时候需要用到 .mjs 后缀，但是浏览器并不关心文件后缀，只需要 http 响应头的MIME类型正确即可（`Content-Type: text/javascript`）。同时，当 `type="module"` 时，默认启用 `defer` 来加载脚本。这里补充一张 defer、async 差异图。

![img](https://file.shenfq.com/em5jy.png)

我们知道浏览器不支持 `script` 的时候，提供了 `noscript` 标签用于降级处理，模块化也提供了类似的标签。

```html
<script type="module" src="./main.js"></script>
<script nomodule>
  alert('当前浏览器不支持 ESM ！！！')
</script>

```

这样我们就能针对支持 ESM 的浏览器直接使用模块化方案加载文件，不支持的浏览器还是使用 webpack 打包的版本。

```html
<script type="module" src="./src/main.js"></script>
<script nomodule src="./dist/app.[hash].js"></script>

```

#####  预加载

我们知道浏览器的 link 标签可以用作资源的预加载，比如我需要预先加载 `main.js` 文件：

```html
<link rel="preload" href="./main.js"></link>

```

如果这个 `main.js` 文件是一个模块化文件，浏览器仅仅预先加载单独这一个文件是没有意义的，前面我们也说过，一个模块化文件下载后还需要转化得到模块记录，进行模块实例、模块求值这些操作，所以我们得想办法告诉浏览器，这个文件是一个模块化的文件，所以浏览器提供了一种新的 rel 类型，专门用于模块化文件的预加载。

```html
<link rel="modulepreload" href="./main.js"></link>

```

##### 现状

虽然主流浏览器都已经支持了 ESM，但是根据 [chrome 的统计](https://www.chromestatus.com/metrics/feature/timeline/popularity/2062)，有用到 `<script type="module">` 的页面只有 1%。截图时间为 `2019/11`。

![统计](https://file.shenfq.com/daolr.png)



#### 服务端

浏览器能够通过 script 标签指定当前脚本是否作为模块处理，但是在 Node.js 中没有很明确的方式来表示是否需要使用 ESM，而且 Node.js 中本身就已经有了 CommonJS 的标准模块化方案。就算开启了 ESM，又通过何种方式来判断当前入口文件导入的模块到底是使用的 ESM 还是 CommonJS 呢？为了解决上述问题，node 社区开始出现了 ESM 的相关草案，具体可以在 [github](https://github.com/nodejs/node-eps/blob/master/002-es-modules.md) 上查阅。

2017年发布的 Node.js 8.5.0 开启了 ESM 的实验性支持，在启动程序时，加上 `--experimental-modules` 来开启对 ESM 的支持，并将 `.mjs` 后缀的文件当做 ESM 来解析。早期的期望是在 Node.js 12 达到 LTS 状态正式发布，然后期望并没有实现，直到最近的 13.2.0 版本才正式支持 ESM，也就是取消了 `--experimental-modules` 启动参数。具体细节可以查看 Node.js 13.2.0 的[官方文档](https://nodejs.org/api/esm.html#esm_ecmascript_modules)。

关于 `.mjs` 后缀社区有两种完全不同的态度。支持的一方认为通过文件后缀区分类型是最简单也是最明确的方式，且社区早已有类似案例，例如，`.jsx` 用于 React 组件、`.ts` 用于 ts 文件；而支持的一方认为，`.js` 作为 js 后缀已经存在这么多年，视觉上很难接受一个 `.mjs` 也是 js 文件，而且现有的很多工具都是以 `.js` 后缀来识别 js 文件，如果引入了 `.mjs` 方案，就有大批量的工具需要修改来有效的适配 ESM。

所以除了 `.mjs` 后缀指定 ESM 外，还可以使用 `pkg.json` 文件的 `type` 属性。如果 type 属性为 module，则表示当前模块应使用 ESM 来解析模块，否则使用 CommonJS 解析模块。

```json
{
  "type": "module" // module | commonjs(default)
}

```

当然有些本地文件是没有 `pkg.json` 的，但是你又不想使用 `.mjs` 后缀，这时候只需要在命令行加上一个启动参数 `--input-type=module`。同时 `input-type` 也支持 commonjs 参数来指定使用 CommonJS（`-—input-type=commonjs`）。

总结一下，Node.js 中，以下三种情况会启用 ESM 的模块加载方式：

1. 文件后缀为`.mjs`;
2. `pkg.json` 中 type 字段指定为 `module`；
3. 启动参数添加 `--input-type=module`。

同样，也有三种情况会启用 CommonJS 的模块加载方式：

1. 文件后缀为`.cjs`;
2. `pkg.json` 中 type 字段指定为 `commonjs`；
3. 启动参数添加 `--input-type=commonjs`。

虽然 13.2 版本去除了 `--experimental-modules` 的启动参数，但是按照文档的说法，在 Node.js 中使用 ESM 依旧是实验特性。

> [Stability: 1](https://nodejs.org/api/documentation.html#documentation_stability_index) - Experimental

不过，相信等到 Node.js 14 LTS 版本发布时，ESM 的支持应该就能进入稳定阶段了，这里还有一个 Node.js 关于 ESM 的整个[计划列表](https://github.com/nodejs/modules/blob/master/doc/plan-for-new-modules-implementation.md)可以查阅。



## 总结

模块化的出现为前端的开发带来了如下好处：

1. 变量都拥有了自己的作用域，而不是直接挂载到全局，有效解决了命名冲突。
2. 让所有的模块都保持单一职责，显著的提升了开发效率以及代码的可维护性。
3. 重复代码不再通过拷贝，而是通过模块引入的方式实现，提升了代码的复用性。
4. 可以使用包管理工具，直接在使用网络上开源的模块。

现代化的前端开发离不开模块化，想想十年前，没有 Node.js，没有 webpack，前端工程的组织是多么的困难，感谢前人一步步积累，为前端的模块化提供了多种解决方案，并且一步步完善。

也许十年后，前端的模块化只剩下了 ESM，但是 CommonJS、AMD 都在前端历史的进程上留下了重要的一笔。