# yihua-app
本系统搭建于2022年11月10日。主要用于存放作者平时积累的组件、案例。目前采用json-server进行数据模拟，以express进行静态资源托管。
后续考虑使用node进行后台的编写。目前主要包括权限控制（动态路由及按钮权限）、组件库、案例、工具、算法...模块。后续会考虑增加笔记
（个人博客）等模块。
项目启动：
* npm run dev
* npm run json-server
* npm run static
## 一、技术选型

* 前端：vue3、vuex、vue-router、elment-ui、indexDB...
* 后端：nodejs（目前采用json-server进行数据模拟）
* 打包工具：vite
* 包管理工具：git
## 二、模块设计

### 2.1 登录模块
1. 首先设计一个默认账号，密码校验。
2. 登录之后依据身份，进行路由的注册。

### 2.2 权限设计模块
* 设计身份及权限控制。包括对路由、按钮等操作的权限设计。
* 提供权限设计公用方法。依据身份获取权限。

### 2.3 公用组件模块
* 设计通用组件：
    * table组件封装
    * 可拖拽组件封装
    * form表单封装
    * svg使用组件
    * ...
* 组件使用文档
    * 展示组件的使用及效果
    * 说明组件提供的API
    * 组件属性传入

### 2.4 案例
### 2.5 工具
### 2.6 算法
### 2.7 node脚本
## 三、Hooks设计
* 设计公用Hooks

## 四、存储封装
### 4.1 storage的封装
### 4.2 indexedDB封装

## 五、vuex封装

## 六、axios封装

## 七、项目结构
* DB文件夹：包含json-server的数据
* mystatic：静态资源存放
* src：项目代码
    * assets：资源
    * case： 案例
    * components：公用组件
    * global：全局操作
    * highCpn：高阶组件
    * hooks：hooks
    * myutilscase：工具
    * serve：请求相关
    * store：vuex相关
    * style：样式文件
    * utils：全局辅助函数
    * views：页面
## 八、项目规范
* 每增加一个模块需要在DB、Views、vuex、vue-router中增加对应的权限、页面、store、路由。
* 一般需要展示的模块需要添加info.json。
* components说明
    * 增加一个components需要增加test.vue、index.vue、info.json。
    * test.vue用于展示组件案例
    * info.json用于说明
    * info.json格式可参照已有模块，也可依据自己的需求增加删减。
* case说明
    * 增加一个case，至少包含index.vue。
    * 在目录下的info中进行改case的注册
* myutilscase
    * 与case相似
* algorithm
    * 在资源文件夹下编写。需要如果使用node编写后台提供文件上传功能。对应的info也需要按照格式填写。
* plugin
    * 与algorithm相似
* sql
    * 与algorithm相似,但是不使用vuex，使用路由带参
* 注意：上述几个模块的注册过代码展示的需要添加到静态资源中，便于请求获取代码。

## 九、文件规范
* vue文件
    * import顺序：vue本身的优先级1，外部插件2，外部插件组件3，本地组件4，本地工具函数5


