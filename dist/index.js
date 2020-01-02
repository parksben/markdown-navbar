'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownNavbar = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

require('core-js/shim');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MarkdownNavbar = exports.MarkdownNavbar = function (_Component) {
  (0, _inherits3.default)(MarkdownNavbar, _Component);

  function MarkdownNavbar(props) {
    (0, _classCallCheck3.default)(this, MarkdownNavbar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MarkdownNavbar.__proto__ || (0, _getPrototypeOf2.default)(MarkdownNavbar)).call(this, props));

    _this._winScroll = function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      var newHeadingList = _this._getHeadingList().map(function (h) {
        return (0, _extends3.default)({}, h, {
          distanceToTop: Math.abs(scrollTop + _this.props.headingTopOffset - h.offsetTop)
        });
      });
      var distanceList = newHeadingList.map(function (h) {
        return h.distanceToTop;
      });
      var minDistance = Math.min.apply(Math, (0, _toConsumableArray3.default)(distanceList));
      var curHeading = newHeadingList.find(function (h) {
        return h.distanceToTop === minDistance;
      });

      if (_this.props.updateHashAuto) {
        _this._updateHash(curHeading.dataId);
      }
      _this.setState({
        currentListNo: curHeading.listNo
      });
    };

    _this.state = {
      currentListNo: ''
    };
    return _this;
  }

  (0, _createClass3.default)(MarkdownNavbar, [{
    key: 'componentWillReceiveProps',
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
    key: 'componentWillUnmount',
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
    key: '_getNavStructure',
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
            t.listNo = navData[i - 1].listNo + '.1';
          } else if (navData[i - 1] && t.level === navData[i - 1].level) {
            t.listNo = navData[i - 1].listNo.replace(/^(.+\.)(\d+)$/g, function (w, $1, $2) {
              return '' + $1 + (parseInt($2, 10) + 1);
            });
          } else {
            t.listNo = '';
          }
        }
      });

      var result = navData.map(function (nav) {
        return (0, _extends3.default)({}, nav, {
          listNo: nav.listNo.indexOf('.') < 0 ? nav.listNo + '.' : nav.listNo,
          text: nav.text.replace(/^(\d+\.)+\s?/g, '').replace(/^\d+\.?\s?/g, '')
        });
      });

      return result;
    }
  }, {
    key: '_scrollToTarget',
    value: function _scrollToTarget(dataId) {
      var _this3 = this;

      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      // TODO: create one new `scrollTo` method for different browsers.
      this.scrollTimeout = setTimeout(function () {
        var target = document.querySelector('[data-id="' + dataId + '"]');
        window.scrollTo(0, target.offsetTop - _this3.props.headingTopOffset);
      }, 1e2);
    }
  }, {
    key: '_initheadingsId',
    value: function _initheadingsId() {
      var _this4 = this;

      this._getNavStructure().forEach(function (t) {
        var headings = document.querySelectorAll('h' + t.level);
        var curheading = Array.prototype.slice.apply(headings).find(function (h) {
          return h.innerText.replace(/^(\d+\.)+\s?/g, '').replace(/^\d+\.?\s?/g, '') === t.text;
        });

        if (curheading) {
          curheading.dataset.id = _this4.props.declarative ? t.text : 'heading-' + t.index;
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
    key: '_getHeadingList',
    value: function _getHeadingList() {
      var _this5 = this;

      var headingList = [];

      this._getNavStructure().forEach(function (t) {
        var headings = document.querySelectorAll('h' + t.level);
        var curheading = Array.prototype.slice.apply(headings).find(function (h) {
          return h.innerText.replace(/^(\d+\.)+\s?/g, '').replace(/^\d+\.?\s?/g, '') === t.text;
        });
        if (curheading) {
          headingList.push({
            dataId: _this5.props.declarative ? t.text : 'heading-' + t.index,
            listNo: t.listNo,
            offsetTop: curheading.offsetTop
          });
        }
      });

      return headingList;
    }
  }, {
    key: '_updateHash',
    value: function _updateHash(value) {
      history.replaceState({}, '', location.pathname + '#' + value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var tBlocks = this._getNavStructure().map(function (t) {
        var cls = 'title-anchor title-level' + t.level + ' ' + (_this6.state.currentListNo === t.listNo ? 'active' : '');

        return _react2.default.createElement(
          'div',
          {
            className: cls,
            onClick: function onClick(evt) {
              evt.preventDefault();
              _this6._updateHash(_this6.props.declarative ? t.text : 'heading-' + t.index);
              _this6._scrollToTarget(_this6.props.declarative ? t.text : 'heading-' + t.index);
              _this6.setState({
                currentListNo: t.listNo
              });
            },
            key: 'title_anchor_' + Math.random().toString(36).substring(2) },
          _this6.props.ordered ? _react2.default.createElement(
            'small',
            null,
            t.listNo
          ) : null,
          t.text
        );
      });

      return _react2.default.createElement(
        'div',
        { className: 'markdown-navigation ' + this.props.className },
        tBlocks
      );
    }
  }]);
  return MarkdownNavbar;
}(_react.Component);

MarkdownNavbar.propTypes = {
  source: _propTypes2.default.string,
  ordered: _propTypes2.default.bool,
  headingTopOffset: _propTypes2.default.number,
  updateHashAuto: _propTypes2.default.bool,
  declarative: _propTypes2.default.bool,
  className: _propTypes2.default.string
};
MarkdownNavbar.defaultProps = {
  source: '',
  ordered: true,
  headingTopOffset: 0,
  updateHashAuto: true,
  declarative: false,
  className: ''
};
exports.default = MarkdownNavbar;
//# sourceMappingURL=index.js.map