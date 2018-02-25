# Markdown-Navbar

Best markdown navigation bar for React.

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

<MarkNav
  className="article-menu"
  source={content}
  headingTopOffset={80}
/>
```

## Screenshots

![Screenshots](./screenshots.gif)

## Options

|property|type|default value|use|
|:-:|:-:|:-:|:-:|
|className|string|""|The className that defines the outermost container of navbar|
|source|string|""|Markdown text content|
|headingTopOffset|number|0|Anchor relative to the top of the window displacement (for the anchor jump)|
|ordered|boolean|true|Whether the title contains a numerical prefix, such as: `1. 2. 2.2`|

## License

`Markdown-Navbar` is released under the MIT license.
