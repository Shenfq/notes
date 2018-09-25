# 模块化

## commonjs起源

2009年对javascript无疑是重要的一年，新的js引擎（v8），并且有成熟的库（jQuery），ES5也在提案中，然而这个语言依然只能出现在浏览器当中。早在2007年，AppJet就提供了一项服务，创建和托管服务端的JavaScript应用。后来Aptana也提供了一个能够在服务端运行Javascript的环境，叫做Jaxer。


:::tip 早期博客的介绍

![AppJet](https://file.shenfq.com/18-7-15/5272642.jpg)
![Jaxer](https://file.shenfq.com/18-7-15/67144717.jpg)

:::

网上还能搜到关于Jaxer的[博客](http://www.cnblogs.com/luq885/archive/2008/01/25/1052288.html)，甚至该项目还在[github](https://github.com/aptana/Jaxer)上存在。

![淘汰的Jaxer](https://file.shenfq.com/18-7-15/95167701.jpg)

但是这些东西都没有发展起来，Javascript并不能替代传统的服务端脚本语言（Perl, PHP, Python, Ruby）。JavaScript是唯一一种运行在每台消费者电脑的编程语言。虽然她有很多的缺点，但是不妨碍有很多人喜欢她。

下面思考一下，如果让JavaScript在服务端运行，还需要些什么？

- JavaScript没有模块系统。要编写JavaScript脚本，它们必须在HTML中进行管理、连接、注入或手动获取和计算。没有用于作用域隔离或依赖关系管理的本机工具。
- JavaScript没有标准库。它有只有浏览器相关的API（BOM、DOM）、Date、Math，但是没有文件系统，更不用说一个I/O操作或二进制数据的原始类型。
- JavaScript没有Web服务器或数据库之类的标准接口。
- JavaScript没有管理依赖项并自动安装它们的包管理系统，除了JSAN(不要与JSON混淆)，而且它在作用域隔离方面表现得不好。


于是2009年1月，[Kevin Dangoor](http://www.kevindangoor.com/) 发起了CommonJS的提议，呼吁JavaScript爱好者联合起来，编写一些规范，让JavaScript在服务端运行起来，并且能够支持跨平台。

>"[This] is not a technical problem,It's a matter of people getting together and making a decision to step forward and start building up something bigger and cooler together."

一周之后，就有了224个参与者。

CommonJS标准包括：

- 模块化
- 二进制字符串和buffer
- 字符集编码
- I/O操作
- 进程、环境变量、流处理
- 文件系统接口
- Socket流
- 单元测试断言
- Web服务器网关接口，JSGI
- 本地和远程包管理

1.0敲定了系统模块的api（stdin/stdout、env，args；未来考虑：log、print、global、整合env/args/command），1.1版本敲定了模块化方案（require），连ECMA TC39和W3C都计划加入进来。

模块是很重要的。CommonJS模块是JavaScript社区第一次在模块系统上取得的成果，与Python和Ruby的一样好，不仅支持依赖管理，而且还支持作用域隔离和模块标识。CommonJS的模块系统可以为服务器、浏览器、桌面应用程序和安全沙箱提供支持。浏览器部署可以通过构建步骤或动态的服务器端支持，从XHR eval(便于调试)到脚本注入(用于生产或调试)。这意味着CommonJS模块是真正可互通的。CommonJS模块标准将模块系统的工作方式与模块的编写方式区分开来。

> Browser deployments can vary from XHR+eval (for easy debugging) to script injection (for production or debugging) either with a build step or dynamic, server-side support. 

自此，2009年出现了很多服务端的js运行环境，并且大都遵循CommonJS规范。

- v8cgi：基于v8引擎实现的运行js的一个apache模块
- Narwhal，配套包管理工具tusk，使用package.json来进行包管理
- Ringojs
- NodeJs