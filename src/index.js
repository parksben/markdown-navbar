import 'core-js/shim';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const randomId = (size = 8) => {
  const str = 'plokmijnuhbygvtfcrdxeszwaq1234567890';
  let result = '';
  while (result.length < size) {
    result += str.charAt(Math.floor(str.length * Math.random()));
  }
  return result;
};

export class MarkdownNavbar extends Component {
  static propTypes = {
    source: PropTypes.string,
    ordered: PropTypes.bool,
    headingTopOffset: PropTypes.number,
    className: PropTypes.string,
  };

  static defaultProps = {
    source: '',
    ordered: true,
    headingTopOffset: 0,
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      currentListNo: '',
    };
  }

  componentDidMount() {
    this.addTargetTimeout = setTimeout(() => {
      this._initheadingsId();
      document.addEventListener('scroll', this._winScroll, false);
    }, 1e3);
  }

  componentWillUnmount() {
    clearTimeout(this.addTargetTimeout);
    clearTimeout(this.scrollTimeout);

    document.removeEventListener('scroll', this._winScroll, false);
  }

  _getNavStructure() {
    const contentWithoutCode = this.props.source.replace(
      /```[^`\n]*\n+[^```]+```\n+/g,
      ''
    );

    const pattOfTitle = /#+\s([^#\n]+)\n*/g;
    const matchResult = contentWithoutCode.match(pattOfTitle);

    if (!matchResult) {
      return [];
    }

    const navData = matchResult.map((r, i) => ({
      index: i,
      level: r.match(/^#+/g)[0].length,
      text: r.replace(pattOfTitle, '$1'),
    }));

    const levelCount = level => navData.filter(r => r.level === level).length;
    let startLevel = 1;
    let startLevelCount = levelCount(startLevel);
    while (!startLevelCount) {
      startLevel += 1;
      startLevelCount = levelCount(startLevel);
    }

    let listNo = 1;
    navData.forEach(t => {
      if (t.level === startLevel) {
        t.listNo = listNo.toString();
        listNo += 1;
      }
    });

    navData.forEach((t, i) => {
      if (!t.listNo) {
        if (navData[i - 1] && t.level === navData[i - 1].level + 1) {
          t.listNo = `${navData[i - 1].listNo}.1`;
        } else if (navData[i - 1] && t.level === navData[i - 1].level) {
          t.listNo = navData[i - 1].listNo.replace(
            /^(.+\.)(\d+)$/g,
            (w, $1, $2) => `${$1}${parseInt($2, 10) + 1}`
          );
        } else {
          t.listNo = '';
        }
      }
    });

    const result = navData.map(nav => ({
      ...nav,
      listNo: nav.listNo.indexOf('.') < 0 ? `${nav.listNo}.` : nav.listNo,
      text: nav.text.replace(/^(\d+\.)+\s?/g, '').replace(/^\d+\.?\s?/g, ''),
    }));

    return result;
  }

  _scrollToTarget(dataId) {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // ToDo: create one new `scrollTo` method for different browsers.
    this.scrollTimeout = setTimeout(() => {
      const target = document.querySelector(`[data-id="${dataId}"]`);
      window.scrollTo(0, target.offsetTop - this.props.headingTopOffset);
    }, 1e2);
  }

  _initheadingsId() {
    this._getNavStructure().forEach(t => {
      const headings = document.querySelectorAll(`h${t.level}`);
      const curheading = Array.prototype.slice
        .apply(headings)
        .find(
          h =>
            h.innerText
              .replace(/^(\d+\.)+\s?/g, '')
              .replace(/^\d+\.?\s?/g, '') === t.text
        );
      if (curheading) {
        curheading.dataset.id = `heading-${t.index}`;
      }

      const headingId = window.location.hash.match(/heading-\d+/g);
      if (headingId && headingId[0] === `heading-${t.index}`) {
        this._scrollToTarget(headingId);
        this.setState({
          currentListNo: t.listNo,
        });
      }
    });
  }

  _getHeadingList() {
    const headingList = [];

    this._getNavStructure().forEach(t => {
      const headings = document.querySelectorAll(`h${t.level}`);
      const curheading = Array.prototype.slice
        .apply(headings)
        .find(
          h =>
            h.innerText
              .replace(/^(\d+\.)+\s?/g, '')
              .replace(/^\d+\.?\s?/g, '') === t.text
        );
      if (curheading) {
        headingList.push({
          dataId: `heading-${t.index}`,
          listNo: t.listNo,
          offsetTop: curheading.offsetTop,
        });
      }
    });

    return headingList;
  }

  _winScroll = () => {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const newHeadingList = this._getHeadingList().map(h => ({
      ...h,
      distanceToTop: Math.abs(
        scrollTop + this.props.headingTopOffset - h.offsetTop
      ),
    }));
    const distanceList = newHeadingList.map(h => h.distanceToTop);
    const minDistance = Math.min(...distanceList);
    const curHeading = newHeadingList.find(
      h => h.distanceToTop === minDistance
    );

    this.setState({
      currentListNo: curHeading.listNo,
    });
  };

  render() {
    const tBlocks = this._getNavStructure().map(t => {
      const cls = `title-anchor title-level${t.level} ${this.state
        .currentListNo === t.listNo
        ? 'active'
        : ''}`;

      return (
        <a
          className={cls}
          href={`#heading-${t.index}`}
          onClick={evt => {
            this._scrollToTarget(`heading-${t.index}`);

            this.setState({
              currentListNo: t.listNo,
            });
          }}
          key={`title_anchor_${randomId()}`}>
          {this.props.ordered
            ? <small>
                {t.listNo}
              </small>
            : null}
          {t.text}
        </a>
      );
    });

    return (
      <div className={`markdown-navigation ${this.props.className}`}>
        {tBlocks}
      </div>
    );
  }
}

export default MarkdownNavbar;
