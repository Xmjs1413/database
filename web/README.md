# 代码目录

```js
+-- build/                                  ---打包的文件目录
+-- config/                                 ---npm run eject 后的配置文件目录
+-- node_modules/                           ---npm下载文件目录
+-- public/
|   |--- ...					            ---公共静态资源
+-- src/                                    ---核心代码目录
|   +--components                           ---公共组件目录   
|   +-- pages                               ---页面文件存放目录
|   |    --- ...
|   |    --- HeaderCustom.tsx               ---顶部导航组件
|   |    --- Page.tsx                       ---页面容器
|   |    --- SiderCustom.tsx                ---左边菜单组件
|   +-- constants                           ---项目公共常量存放目录
|   +-- locales                             ---国际化存放目录
|   +-- routes                              ---路由配置目录
|   +-- service                             ---http请求文件存放目录
|   +-- style                               ---项目的样式存放目录，主要采用less编写,(项目支持样式模块化导入,xxx.module.less)
|   +-- utils                               ---工具文件存放目录
|   --- App.tsx                             ---组件入口文件
|   --- index.tsx                           ---项目的整体ts入口文件
--- .env                                    ---启动项目自定义端口配置文件
--- .eslintrc                               ---自定义eslint配置文件，包括增加的react tsx语法限制
--- package.json                            ---依赖配置文件
```

# 安装运行

## 1.下载或克隆项目源码

<br/>

> ### git clone（git 地址）

<br/>

## 2.安装依赖

<br/>

> ### 使用 npm，yarn 工具皆可
>
> <br />

```
 - npm install
 - yarn
```

<br/>

## 3.启动项目

```
 npm start
```

## 4.打包项目

```
npm run build
```

> ### 注：打包完了之后，会在根目录下生成一个 build 文件夹，为打包完之后的项目

## 5.部署上线

> ### 这里只对 nginx 部署做简单介绍

> ### nginx 目录结构如下

```
+--
|  +---conf
|  |    -- ...
|  |    -- nginx.conf
|  |    -- ...
|  +---contrib
|  +---docs
|  +---html
|  |    -- 50x.html
|  |    -- index.html
|  +---logs
|  +---temp
|  nginx.exe

```

-   ### 打开 nginx.conf 文件， 配置服务启动信息（地址，端口号，代理等）

-   ### 把打包好的 build 文件夹放进 html 文件夹下面

-   ### 启动 nginx

> #### 注：每次修改了 nginx.conf 文件之后需要重启 nginx 服务
