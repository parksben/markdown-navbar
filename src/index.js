import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MarkdownNavbar extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    ordered: PropTypes.bool,
    headingTopOffset: PropTypes.number,
    updateHashAuto: PropTypes.bool,
    declarative: PropTypes.bool,
    className: PropTypes.string,
    onNavItemClick: PropTypes.func,
    onHashChange: PropTypes.func,
  };

  static defaultProps = {
    source: '',
    ordered: true,
    headingTopOffset: 0,
    updateHashAuto: true,
    declarative: false,
    className: '',
    onNavItemClick: () => {},
    onHashChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      currentListNo: '',
    };
  }

  componentDidMount() {
    if (this.addTargetTimeout) {
      clearTimeout(this.addTargetTimeout);
    }
    this.addTargetTimeout = setTimeout(() => {
      this._initheadingsId();
      document.addEventListener('scroll', this._winScroll, false);
    }, 1e3);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.source !== this.props.source) {
      this._initheadingsId();
    }
    return true;
  }

  componentWillUnmount() {
    if (this.addTargetTimeout) {
      clearTimeout(this.addTargetTimeout);
    }
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    document.removeEventListener('scroll', this._winScroll, false);
  }

  _getNavStructure() {
    const contentWithoutCode = this.props.source
      .replace(/^#\s[^#\n]*\n+/, '')
      .replace(/```[^`\n]*\n+[^```]+```\n+/g, '');

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

    // TODO: create one new `scrollTo` method for different browsers.
    this.scrollTimeout = setTimeout(() => {
      const target = document.querySelector(`[data-id="${dataId}"]`);
      window.scrollTo(0, target.offsetTop - this.props.headingTopOffset);
    }, 1e2);
  }

  _initheadingsId() {
    const headingId = decodeURIComponent(
      this.props.declarative
        ? window.location.hash.replace(/^#/, '').trim()
        : (window.location.hash.match(/heading-\d+/g) || [])[0]
    );

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
        curheading.dataset.id = this.props.declarative
          ? t.text
          : `heading-${t.index}`;
      }

      if (headingId && headingId === curheading.dataset.id) {
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
          dataId: this.props.declarative ? t.text : `heading-${t.index}`,
          listNo: t.listNo,
          offsetTop: curheading.offsetTop,
        });
      }
    });

    return headingList;
  }

  _getCurrentHashValue = () =>
    decodeURIComponent(window.location.hash.replace(/^#/, ''));

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

    if (this.props.updateHashAuto) {
      // Hash changing callback
      if (curHeading.dataId !== this._getCurrentHashValue()) {
        this.props.onHashChange(curHeading.dataId, this._getCurrentHashValue());
      }

      this._updateHash(curHeading.dataId);
    }
    this.setState({
      currentListNo: curHeading.listNo,
    });
  };

  _updateHash(value) {
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${window.location.search}#${value}`
    );
  }

  render() {
    const tBlocks = this._getNavStructure().map(t => {
      const cls = `title-anchor title-level${t.level} ${
        this.state.currentListNo === t.listNo ? 'active' : ''
      }`;

      return (
        <div
          className={cls}
          onClick={evt => {
            const currentHash = this.props.declarative
              ? t.text
              : `heading-${t.index}`;

            // Avoid execution the callback `onHashChange` when clicking current nav item
            if (t.listNo !== this.state.currentListNo) {
              // Hash changing callback
              this.props.onHashChange(currentHash, this._getCurrentHashValue());
            }

            // Nav item clicking callback
            this.props.onNavItemClick(evt, currentHash);

            this._updateHash(currentHash);
            this._scrollToTarget(currentHash);
            this.setState({
              currentListNo: t.listNo,
            });
          }}
          key={`title_anchor_${Math.random()
            .toString(36)
            .substring(2)}`}>
          {this.props.ordered ? <small>{t.listNo}</small> : null}
          {t.text}
        </div>
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
