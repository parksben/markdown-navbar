# Markdown-Navbar

![npm](https://img.shields.io/npm/l/markdown-navbar.svg)
![npm](https://img.shields.io/npm/dt/markdown-navbar.svg)
![npm](https://img.shields.io/npm/v/markdown-navbar/latest.svg)
![GitHub file size in bytes](https://img.shields.io/github/size/parksben/markdown-navbar/src/index.js)

Best markdown navbar component for React. With this component, you can:

- Display article directory for readers
- Click on the anchor point in the directory to jump to the corresponding article content
- Share url with anchor hash value to reader

## Screenshots

![Screenshots](./screenshots.gif)

[Demo online](https://parksben.github.io/post/2018-01-28T10:26:17_create-a-react-blog)

## Instructions

This UI component needs to be used in **conjunction** with your article content. When using this component, you must ensure that your article under the same page content.

## Install

```
yarn add markdown-navbar
```

or

```
npm install markdown-navbar
```

## Usage

```js
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

const content = '## Heading One...\n\n## Heading Two...\n';

<MarkNav className="article-menu" source={content} headingTopOffset={80} />;
```

## Options

|     Property     | Data Type | Default Value |                                       Description                                        |
| :--------------: | :-------: | :-----------: | :--------------------------------------------------------------------------------------: |
|    className     |  string   |      ""       |               The className that defines the outermost container of navbar               |
|      source      |  string   |      ""       |                                  Markdown text content                                   |
| headingTopOffset |  number   |       0       |       Anchor displacement relative to the top of the window (for the anchor jump)        |
|  updateHashAuto  |  boolean  |     true      |    Automatically update the hash value of browser address when page scrolling if true    |
|   declarative    |  boolean  |     false     | Use the text of the title from Markdown content as the hash value for the anchor if true |
|     ordered      |  boolean  |     true      |           Whether the title contains a numerical prefix, such as: `1. 2. 2.2`            |

## License

[MIT license](./LICENSE)
