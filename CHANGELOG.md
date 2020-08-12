<a name="1.4.3"></a>
## [1.4.3](https://github.com/parksben/markdown-navbar/compare/1.4.0...1.4.3) (2020-08-12)


### Bug Fixes

* the exception in Safari due to too many calls to the history.replacestate method ([2834372](https://github.com/parksben/markdown-navbar/commit/2834372))
* 文档内容无标题时的页面滚动报错 ([a3353a6](https://github.com/parksben/markdown-navbar/commit/a3353a6))
* 非标题行内出现#号导致的导航解析不正确 ([074cb10](https://github.com/parksben/markdown-navbar/commit/074cb10))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/parksben/markdown-navbar/compare/1.3.7...1.4.0) (2020-01-14)


### Features

* scroll page to target heading when event `hashchange` has been triggered ([e76941d](https://github.com/parksben/markdown-navbar/commit/e76941d))



<a name="1.3.7"></a>
## [1.3.7](https://github.com/parksben/markdown-navbar/compare/1.3.5...1.3.7) (2020-01-09)


### Bug Fixes

* the dataset.id of headings not be updated correctly after markdown source changed ([a175e73](https://github.com/parksben/markdown-navbar/commit/a175e73))



<a name="1.3.5"></a>
## [1.3.5](https://github.com/parksben/markdown-navbar/compare/1.3.2...1.3.5) (2020-01-06)


### Bug Fixes

* serial number parse error when some content exists before level 1 title ([35a234f](https://github.com/parksben/markdown-navbar/commit/35a234f))
* some data-id of heading elements not registered while two or multi same text of headings exist in one documentation ([cedf928](https://github.com/parksben/markdown-navbar/commit/cedf928))



<a name="1.3.2"></a>
## [1.3.2](https://github.com/parksben/markdown-navbar/compare/v1.3.1...1.3.2) (2020-01-04)



<a name="1.3.1"></a>
## [1.3.1](https://github.com/parksben/markdown-navbar/compare/8e4e2d9...v1.3.1) (2020-01-04)


### Bug Fixes

* anchor positioning fails when the page is initialized If there is a symbol or blank space in the title ([077a723](https://github.com/parksben/markdown-navbar/commit/077a723))
* Could not find dependency: core-js relative to dist/index.js ([c1659ed](https://github.com/parksben/markdown-navbar/commit/c1659ed))
* decode the value of `location.hash` as event callback params ([9a284a0](https://github.com/parksben/markdown-navbar/commit/9a284a0))
* fix some bugs for navigation and update README.md ([8e4e2d9](https://github.com/parksben/markdown-navbar/commit/8e4e2d9))
* use location search for hash changing ([413e654](https://github.com/parksben/markdown-navbar/commit/413e654))
* use new method to update the hash value of browser address without page scrolling ([1aae9fb](https://github.com/parksben/markdown-navbar/commit/1aae9fb))


### Features

* add a demo online at codesandbox.io && improve README ([7a8e419](https://github.com/parksben/markdown-navbar/commit/7a8e419))
* implement some event hooks ([1ab6712](https://github.com/parksben/markdown-navbar/commit/1ab6712))
* the function of automatically updating the hash value of browser address bar when the page scrolling ([bac0746](https://github.com/parksben/markdown-navbar/commit/bac0746))



