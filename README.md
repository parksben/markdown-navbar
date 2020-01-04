# Markdown-Navbar

![npm](https://img.shields.io/npm/l/markdown-navbar.svg)
![npm](https://img.shields.io/npm/dt/markdown-navbar.svg)
![npm](https://img.shields.io/npm/v/markdown-navbar/latest.svg)
![GitHub file size in bytes](https://img.shields.io/github/size/parksben/markdown-navbar/src/index.js)

Best markdown navbar component for React. With this component, you can:

- Display article directory for readers
- Click on the anchor point in the directory to jump to the corresponding article content
- Share url with anchor hash value to reader

## 🍿 Install

```bash
yarn add markdown-navbar # or `npm i markdown-navbar --save`
```

## 🌭 Quick Start

```js
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

const content = '## Heading One...\n\n## Heading Two...\n';

<MarkNav className="article-menu" source={content} headingTopOffset={80} />;
```

## 🍭 Demo Online

Click the thumbnail below to view the demo online:

[![Demo on Netlify](https://screenshots.codesandbox.io/e7e0n.png)](https://csb-e7e0n.netlify.com/)

Click the button below to edit & debug it:

[![Edit markdown-navbar-demo-online](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/markdown-navbar-demo-online-e7e0n?fontsize=14&hidenavigation=1&theme=dark)

## 🍔 Props

|     Property     | Data Type |      Default Value       |                                       Description                                        |
| :--------------: | :-------: | :----------------------: | :--------------------------------------------------------------------------------------: |
|    className     |  string   |            ""            |               The className that defines the outermost container of navbar               |
|      source      |  string   |            ""            |                                  Markdown text content                                   |
| headingTopOffset |  number   |            0             |       Anchor displacement relative to the top of the window (for the anchor jump)        |
|  updateHashAuto  |  boolean  |           true           |    Automatically update the hash value of browser address when page scrolling if true    |
|   declarative    |  boolean  |          false           | Use the text of the title from Markdown content as the hash value for the anchor if true |
|     ordered      |  boolean  |           true           |           Whether the title contains a numerical prefix, such as: `1. 2. 2.2`            |
|  onNavItemClick  | function  | (event, hashValue) => {} |                  The event callback function after clicking navbar item                  |
|   onHashChange   | function  | (newHash, oldHash) => {} |      The event callback function before the hash value of browser address changing       |

## 🧀 Important Instructions

- This UI component needs to be used in **conjunction** with your article content. When using this component, you must ensure that your article under the same page content.
- Please confirm that every title of your markdown document is different by each other when the property `declarative` is setted as `true`.

## 🍺 License

[MIT license](./LICENSE)

## ☕️ Donate me a coffee

<div style="overflow: hidden;">
  <img style="display: inline-block;" width="auto" height="240" src="https://github.com/parksben/markdown-navbar/blob/master/assets/wechat.jpg?raw=true" alt="wechat" />
  <img style="display: inline-block;" width="auto" height="240" src="https://github.com/parksben/markdown-navbar/blob/master/assets/alipay.jpg?raw=true" alt="alipay" />
</div>
