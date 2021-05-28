# react-dev-env

从零配置React开发环境

## 使用方法

施工中

## 构建过程

0. 初始化npm
```shell
npm init -y
```

1. 安装 [webpack](https://webpack.js.org/)

    ```shell
    npm i -D webpack webpack-cli webpack-dev-server
    ```
    > ⚠️ 考虑到使用版本可能有所不同 本项目中没有使用```-g```来全局安装```webpack```

    在项目根目录 ```react-dev-env/```下新建```src```和```dist```两个文件夹  
    并在```src```文件夹下新建```index.js```文件

    在项目根目录 ```react-dev-env/```下创建```webpack.config.js```文件

        .
        ├── node_modules                   # [文件夹] TL;DR
        ├── src
        │   └──index.js
        ├── dist
        ├── package-lock.json              # 
        ├── package.json                   # 
        ├── README.md                      # 当前文件
        └── webpack.config.js              # 配置文件 仅用于development模式

    ```javascript
    const path = require('path');

    module.exports = {
      entry: path.join(__dirname, 'src', 'index.js'),
      output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
      },
      mode: 'development'
    }
    ```
    以上为运行webpack命令最简配置  
    修改package.json文件中的script的值  
    删除test命令并添加build
    ```json
    {
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack --watch"
      }
    }
    ```
    通过运行一下命令 可从src/index.js文件为起点  
    打包其所有需要的文件输出到dist/bundle.js中
    ```shell
    npm run build
    ```
    可通过添加```--watch```使webpack自动检测文件变动并执行build命令  
    通过在config文件中配置devServer能使我们在开发过程中随时观察页面的状况  
    使开发体验达到极佳  

    向package.json中添加一条新命令
    ```json
    {
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack --watch",
        "dev": "webpack serve"
      }
    }
    ```
    向webpack.config.js中添加devServer
    ```javascript
    const path = require('path');
    module.exports = {
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        disableHostCheck: true,
        inline: true,
        hot: true,
        port: 8080,
        host: '0.0.0.0',
        hot: true,
        overlay: {
          errors: true
        },
        stats: {
          colors: true,
          reasons: true,
          chunks: false
        }
      }
    }
    ```
    之后便可以通过以下命令开启服务 访问http://localhost:8080访问页面  
    其他设备则是通过 http://[your ip address]:8080来访问
    ```
    npm run dev
    ```


2. 安装 [babel](https://babeljs.io/) babel-loader 和 plugin
    
    通过babel将代码转换为向后兼容的JS版本
    ```shell
    npm i --save-dev babel-loader @babel/core
    npm i -D @babel/preset-es2015 @babel/preset-react
    npm install --save-dev @babel/plugin-transform-arrow-functions
    npm install --save-dev @babel/plugin-proposal-class-properties
    ```
    > ⚠️ NOTE: @babel/plugin-transform-arrow-functions is included in @babel/preset-env
    > ⚠️ NOTE: @babel/plugin-proposal-class-properties is included in @babel/preset-env
    
    修改webpack.config.js文件
    ```js
    module.exports = {

      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader'
            },
            exclude: /node_modules/,
            include: path.join(__dirname, 'src'),
          },
        ]
      },

    }
    ```
    在根目录下创建.babelrc文件
    ```json
    {
      "presets": [
        [
          "@babel/preset-env",
          {
            "useBuiltIns": "entry"
          }
        ],
        "@babel/preset-react"
      ],
      "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-arrow-functions"
      ]
    }
    ```


3. 安装 [react](https://reactjs.org/) 和 [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)
    ```shell
    npm i react react-dom
    npm i -D html-webpack-plugin
    ```
    在webpack.config.js中配置plugin
    ```js
    const htmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      plugins: [
        new htmlWebpackPlugin({
          template: path.join(__dirname, 'src', 'index.html'),
          hash: true
        })
      ]
    }
    ```
    在src下新建template文件夹并在其中新建index.html文件
    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title> React App </title>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
    ```
