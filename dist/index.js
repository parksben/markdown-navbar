"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.search");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MarkdownNavbar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MarkdownNavbar =
/*#__PURE__*/
function (_Component) {
  _inherits(MarkdownNavbar, _Component);

  function MarkdownNavbar(props) {
    var _this;

    _classCallCheck(this, MarkdownNavbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MarkdownNavbar).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_winScroll", function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      var newHeadingList = _this._getHeadingList().map(function (h) {
        return _objectSpread({}, h, {
          distanceToTop: Math.abs(scrollTop + _this.props.headingTopOffset - h.offsetTop)
        });
      });

      var distanceList = newHeadingList.map(function (h) {
        return h.distanceToTop;
      });
      var minDistance = Math.min.apply(Math, _toConsumableArray(distanceList));
      var curHeading = newHeadingList.find(function (h) {
        return h.distanceToTop === minDistance;
      });

      if (_this.props.updateHashAuto) {
        _this._updateHash(curHeading.dataId); // Hash changing callback


        _this.props.onHashChange(curHeading.dataId);
      }

      _this.setState({
        currentListNo: curHeading.listNo
      });
    });

    _this.state = {
      currentListNo: ''
    };
    return _this;
  }

  _createClass(MarkdownNavbar, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      var _this2 = this;

      if (this.addTargetTimeout) {
        clearTimeout(this.addTargetTimeout);
      }

      this.addTargetTimeout = setTimeout(function () {
        _this2._initheadingsId();

        document.addEventListener('scroll', _this2._winScroll, false);
      }, 1e3);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.addTargetTimeout) {
        clearTimeout(this.addTargetTimeout);
      }

      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      document.removeEventListener('scroll', this._winScroll, false);
    }
  }, {
    key: "_getNavStructure",
    value: function _getNavStructure() {
      var contentWithoutCode = this.props.source.replace(/```[^`\n]*\n+[^```]+```\n+/g, '');
      var pattOfTitle = /#+\s([^#\n]+)\n*/g;
      var matchResult = contentWithoutCode.match(pattOfTitle);

      if (!matchResult) {
        return [];
      }

      var navData = matchResult.map(function (r, i) {
        return {
          index: i,
          level: r.match(/^#+/g)[0].length,
          text: r.replace(pattOfTitle, '$1')
        };
      });

      var levelCount = function levelCount(level) {
        return navData.filter(function (r) {
          return r.level === level;
        }).length;
      };

      var startLevel = 1;
      var startLevelCount = levelCount(startLevel);

      while (!startLevelCount) {
        startLevel += 1;
        startLevelCount = levelCount(startLevel);
      }

      var listNo = 1;
      navData.forEach(function (t) {
        if (t.level === startLevel) {
          t.listNo = listNo.toString();
          listNo += 1;
        }
      });
      navData.forEach(function (t, i) {
        if (!t.listNo) {
          if (navData[i - 1] && t.level === navData[i - 1].level + 1) {
            t.listNo = "".concat(navData[i - 1].listNo, ".1");
          } else if (navData[i - 1] && t.level === navData[i - 1].level) {
            t.listNo = navData[i - 1].listNo.replace(/^(.+\.)(\d+)$/g, function (w, $1, $2) {
              return "".concat($1).concat(parseInt($2, 10) + 1);
            });
          } else {
            t.listNo = '';
          }
        }
      });
      var result = navData.map(function (nav) {
        return _objectSpread({}, nav, {
          listNo: nav.listNo.indexOf('.') < 0 ? "".concat(nav.listNo, ".") : nav.listNo,
          text: nav.text.replace(/^(\d+\.)+\s?/g, '').replace(/^\d+\.?\s?/g, '')
        });
      });
      return result;
    }
  }, {
    key: "_scrollToTarget",
    value: function _scrollToTarget(dataId) {
      var _this3 = this;

      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      } // TODO: create one new `scrollTo` method for different browsers.


      this.scrollTimeout = setTimeout(function () {
        var target = document.querySelector("[data-id=\"".concat(dataId, "\"]"));
        window.scrollTo(0, target.offsetTop - _this3.props.headingTopOffset);
      }, 1e2);
    }
  }, {
    key: "_initheadingsId",
    value: function _initheadingsId() {
      var _this4 = this;

      this._getNavStructure().forEach(function (t) {
        var headings = document.querySelectorAll("h".concat(t.level));
        var curheading = Array.prototype.slice.apply(headings).find(function (h) {
          return h.innerText.replace(/^(\d+\.)+\s?/g, '').replace(/^\d+\.?\s?/g, '') === t.text;
        });

        if (curheading) {
          curheading.dataset.id = _this4.props.declarative ? t.text : "heading-".concat(t.index);
        }

        var headingId = _this4.props.declarative ? window.location.hash.replace(/^#/, '').trim() : (window.location.hash.match(/heading-\d+/g) || [])[0];

        if (headingId && headingId === curheading.dataset.id) {
          _this4._scrollToTarget(headingId);

          _this4.setState({
            currentListNo: t.listNo
          });
        }
      });
    }
  }, {
    key: "_getHeadingList",
    value: function _getHeadingList() {
      var _this5 = this;

      var headingList = [];

      this._getNavStructure().forEach(function (t) {
        var headings = document.querySelectorAll("h".concat(t.level));
        var curheading = Array.prototype.slice.apply(headings).find(function (h) {
          return h.innerText.replace(/^(\d+\.)+\s?/g, '').replace(/^\d+\.?\s?/g, '') === t.text;
        });

        if (curheading) {
          headingList.push({
            dataId: _this5.props.declarative ? t.text : "heading-".concat(t.index),
            listNo: t.listNo,
            offsetTop: curheading.offsetTop
          });
        }
      });

      return headingList;
    }
  }, {
    key: "_updateHash",
    value: function _updateHash(value) {
      history.replaceState({}, '', "".concat(window.location.pathname).concat(window.location.search, "#").concat(value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var tBlocks = this._getNavStructure().map(function (t) {
        var cls = "title-anchor title-level".concat(t.level, " ").concat(_this6.state.currentListNo === t.listNo ? 'active' : '');
        return _react.default.createElement("div", {
          className: cls,
          onClick: function onClick(evt) {
            // Avoid the trigger of event callback `onNavChange` when clicking current nav item
            if (t.listNo === _this6.state.currentListNo) {
              return;
            }

            var currentHash = _this6.props.declarative ? t.text : "heading-".concat(t.index);

            _this6._updateHash(currentHash);

            _this6._scrollToTarget(currentHash);

            _this6.setState({
              currentListNo: t.listNo
            }); // Nav changing callback


            _this6.props.onNavChange(evt, currentHash); // Hash changing callback


            _this6.props.onHashChange(currentHash);
          },
          key: "title_anchor_".concat(Math.random().toString(36).substring(2))
        }, _this6.props.ordered ? _react.default.createElement("small", null, t.listNo) : null, t.text);
      });

      return _react.default.createElement("div", {
        className: "markdown-navigation ".concat(this.props.className)
      }, tBlocks);
    }
  }]);

  return MarkdownNavbar;
}(_react.Component);

exports.MarkdownNavbar = MarkdownNavbar;

_defineProperty(MarkdownNavbar, "propTypes", {
  source: _propTypes.default.string,
  ordered: _propTypes.default.bool,
  headingTopOffset: _propTypes.default.number,
  updateHashAuto: _propTypes.default.bool,
  declarative: _propTypes.default.bool,
  className: _propTypes.default.string,
  onNavChange: _propTypes.default.func,
  onHashChange: _propTypes.default.func
});

_defineProperty(MarkdownNavbar, "defaultProps", {
  source: '',
  ordered: true,
  headingTopOffset: 0,
  updateHashAuto: true,
  declarative: false,
  className: '',
  onNavChange: function onNavChange() {},
  onHashChange: function onHashChange() {}
});

var _default = MarkdownNavbar;
exports.default = _default;
//# sourceMappingURL=index.js.map