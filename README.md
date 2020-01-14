# Markdown-Navbar

![npm](https://img.shields.io/npm/l/markdown-navbar.svg)
![npm](https://img.shields.io/npm/dt/markdown-navbar.svg)
![npm](https://img.shields.io/npm/v/markdown-navbar/latest.svg)
![GitHub file size in bytes](https://img.shields.io/github/size/parksben/markdown-navbar/src/index.js)

Best markdown navbar component for React. With this component, you can:

- Display article directory for readers
- Click on the anchor point in the directory to jump to the corresponding article content
- Share url with anchor hash value to reader

## 🍭 Demo Online

Click the thumbnail below to view the demo online:

<a href="https://csb-e7e0n.netlify.com/" target="_blank" style="display: inline-block; margin-bottom: 32px;">
  <img src="https://screenshots.codesandbox.io/e7e0n.png" alt="Demo on Netlify" style="width: 360px; border-radius: 5px; box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.32);">
</a>

Click the button below to edit & debug it:

<a href="https://codesandbox.io/s/markdown-navbar-demo-online-e7e0n?fontsize=14&hidenavigation=1&theme=dark" target="_blank">
  <img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit markdown-navbar-demo-online">
</a>

## 🍿 Install

```bash
yarn add markdown-navbar # or `npm i markdown-navbar --save`
```

## 🌭 Quick Start

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
// One third-part component for render markdown documentation
import ReactMarkdown from 'react-markdown';
import MarkdownNavbar from 'markdown-navbar';
// The default style of markdown-navbar should be imported additionally
import 'markdown-navbar/dist/navbar.css';

const article = `# Markdown-Navbar Demo

## Chicken Chicken

Chicken Chicken Chicken Chicken Chicken.

* Chicken Chicken Chicken Chicken Chicken.
* Chicken Chicken Chicken Chicken Chicken.
* Chicken Chicken Chicken Chicken Chicken.

### Chicken Chicken Chicken

Chicken Chicken Chicken Chicken Chicken.

#### Chicken Chicken Chicken Chicken

Chicken Chicken Chicken Chicken Chicken Chicken.`;

function App() {
  return (
    <div className="App">
      <div className="article">
        <ReactMarkdown source={article} />
      </div>
      <div className="navigation">
        <MarkdownNavbar source={article} />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## 🍔 Props

|     Property     | Data Type |           Default Value           |                                       Description                                        |
| :--------------: | :-------: | :-------------------------------: | :--------------------------------------------------------------------------------------: |
|    className     |  string   |                ""                 |               The className that defines the outermost container of navbar               |
|      source      |  string   |                ""                 |                                  Markdown text content                                   |
| headingTopOffset |  number   |                 0                 |       Anchor displacement relative to the top of the window (for the anchor jump)        |
|  updateHashAuto  |  boolean  |               true                |    Automatically update the hash value of browser address when page scrolling if true    |
|   declarative    |  boolean  |               false               | Use the text of the title from Markdown content as the hash value for the anchor if true |
|     ordered      |  boolean  |               true                |           Whether the title contains a numerical prefix, such as: `1. 2. 2.2`            |
|  onNavItemClick  | function  | (event, element, hashValue) => {} |                  The event callback function after clicking navbar item                  |
|   onHashChange   | function  |     (newHash, oldHash) => {}      |      The event callback function before the hash value of browser address changing       |

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
