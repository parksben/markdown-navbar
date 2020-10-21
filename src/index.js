import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

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
        onNavItemClick: () => { },
        onHashChange: () => { },
    };

    constructor(props) {
        super(props);
        this.state = {
            currentListNo: '',
            navStructure: []
        };
    }

    safeScrollTo(element,top,left = 0,smooth){
      if(!element) return
      if(typeof element.scrollTo === 'function' ){
          const scrollConfig = {
              top,
              left,
          }
          if(smooth){
              scrollConfig.behavior = "smooth"
          }
          element.scrollTo(scrollConfig)
      } else{
          if(element === window){
              document.documentElement.scrollTop = top
              document.documentElement.scrollLeft = left
          } else{
              element.scrollTop = top
              element.scrollLeft = left
          }
      }
    }
    refreshNav(source) {
        if (this.addTargetTimeout) {
            clearTimeout(this.addTargetTimeout);
        }
        this.setState({ navStructure: this.getNavStructure(source) }, () => {
            this.addTargetTimeout = setTimeout(() => {
                this.initHeadingsId();
                if (this.state.navStructure.length) {
                    const { listNo } = this.state.navStructure[0]
                    this.setState({
                        currentListNo: listNo
                    })
                }
                document.addEventListener('scroll', this.winScroll, false);
                window.addEventListener('hashchange', this.winHashChange, false);
            }, 500);
        })
    }

    componentDidMount() {
        // 初始化列表数据
        const { source } = this.props
        this.refreshNav(source)
    }
    componentWillReceiveProps(newProps) {
        // 复用时开启，用于在source更新时刷新列表
        const { source } = newProps
        this.refreshNav(source)
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.source !== this.props.source) {
            if (this.scrollEventLockTimer) {
                clearTimeout(this.scrollEventLockTimer);
            }
            this.scrollEventLock = true;

            this.safeScrollTo(window,0,0)
            this.safeScrollTo(this.refs.container,0,0)
            this.setState({
                currentListNo: '',
            });
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            Array.prototype.slice.apply(headings).forEach((h) => (h.dataset.id = ''));

            this.scrollEventLockTimer = setTimeout(() => {
                this.initHeadingsId();
                this.scrollEventLock = false;
            }, 500);
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
        document.removeEventListener('scroll', this.winScroll, false);
        window.removeEventListener('hashchange', this.winHashChange, false);
    }
    trimArrZero(arr){
      let start,end
      for(start = 0; start < arr.length ;start++){
          if(arr[start]){
              break
          }
      }
      for(end = arr.length - 1 ;end >= 0 ; end--){
          if(arr[end]){
            break
          }
      }
      return arr.slice(start,end + 1)
  }

    getNavStructure(source) {
        const contentWithoutCode = source
            .replace(/^[^#]+\n/g, '')
            .replace(/(?:[^\n#]+)#+\s([^#\n]+)\n*/g, '') // 匹配行内出现 # 号的情况
            .replace(/^#\s[^#\n]*\n+/, '')
            .replace(/```[^`\n]*\n+[^```]+```\n+/g, '')
            .replace(/`([^`\n]+)`/g, '$1')
            .replace(/\*\*?([^*\n]+)\*\*?/g, '$1')
            .replace(/__?([^_\n]+)__?/g, '$1')
            .trim();

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

        let maxLevel = 0;
        navData.forEach((t) => {
            if (t.level > maxLevel) {
                maxLevel = t.level
            }
        })
        let matchStack = [];
        // 此部分重构，原有方法会出现次级标题后再次出现高级标题时，listNo重复的bug
        for (let i = 0; i < navData.length; i++) {
            const t = navData[i];
            const { level } = t
            while (matchStack.length && matchStack[matchStack.length - 1].level > level) {
                matchStack.pop();
            }
            if (matchStack.length === 0) {
                const arr = new Array(maxLevel).fill(0);
                arr[level - 1] += 1;
                matchStack.push({
                    level,
                    arr,
                })
                t.listNo = this.trimArrZero(arr).join(".")
                continue;
            }
            const { arr } = matchStack[matchStack.length - 1];
            const newArr = arr.slice()
            newArr[level - 1] += 1;
            matchStack.push({
                level,
                arr: newArr
            })
            t.listNo = this.trimArrZero(newArr).join(".")
        };
        return navData;
    }

    scrollToTarget(dataId) {
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }

        this.scrollTimeout = setTimeout(() => {
            const target = document.querySelector(`[data-id="${dataId}"]`);
            if (target && typeof target.offsetTop === 'number') {
              this.safeScrollTo(window,target.offsetTop - this.props.headingTopOffset,0)           
            }
        }, 0);
    }

    initHeadingsId() {
        const headingId = decodeURIComponent(
            this.props.declarative
                ? window.location.hash.replace(/^#/, '').trim()
                : (window.location.hash.match(/heading-\d+/g) || [])[0]
        );

        this.state.navStructure.forEach((t) => {
            const headings = document.querySelectorAll(`h${t.level}`);
            const curHeading = Array.prototype.slice
                .apply(headings)
                .find(
                    (h) =>
                        h.innerText.trim() === t.text.trim() &&
                        (!h.dataset || !h.dataset.id)
                );

            if (curHeading) {
                curHeading.dataset.id = this.props.declarative
                    ? `${t.listNo}-${t.text}`
                    : `heading-${t.index}`;

                if (headingId && headingId === curHeading.dataset.id) {
                    this.scrollToTarget(headingId);
                    this.setState({
                        currentListNo: t.listNo,
                    });
                }
            }
        });
    }

    getHeadingList() {
        const headingList = [];

        this.state.navStructure.forEach((t) => {
            const headings = document.querySelectorAll(`h${t.level}`);
            const curHeading = Array.prototype.slice
                .apply(headings)
                .find(
                    (h) =>
                        h.innerText.trim() === t.text.trim() &&
                        !headingList.find((x) => x.offsetTop === h.offsetTop)
                );
            if (curHeading) {
                headingList.push({
                    dataId: this.props.declarative ? t.text : `heading-${t.index}`,
                    listNo: t.listNo,
                    offsetTop: curHeading.offsetTop,
                });
            }
        });

        return headingList;
    }

    getCurrentHashValue = () =>
        decodeURIComponent(window.location.hash.replace(/^#/, ''));

    winScroll = throttle(() => {
        if (this.scrollEventLock) return;

        const scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        const newHeadingList = this.getHeadingList().map((h) => ({
            ...h,
            distanceToTop: Math.abs(
                scrollTop + this.props.headingTopOffset - h.offsetTop
            ),
        }));
        const distanceList = newHeadingList.map((h) => h.distanceToTop);
        const minDistance = Math.min(...distanceList);
        const curHeading = newHeadingList.find(
            (h) => h.distanceToTop === minDistance
        );

        if (!curHeading) return;

        if (this.props.updateHashAuto) {
            // Hash changing callback
            if (curHeading.dataId !== this.getCurrentHashValue()) {
                this.props.onHashChange(curHeading.dataId, this.getCurrentHashValue());
            }

            this.updateHash(curHeading.dataId);
        }
        if(currentNavElement){
          const {container} = this.refs
          const {offsetTop} = currentNavElement
          const {scrollTop:containerScrollTop,offsetHeight:containerOffsetHeight} = container
          const min = containerScrollTop + 0.3 * containerOffsetHeight
          const max = containerScrollTop  + 0.7 * containerOffsetHeight
          if(offsetTop < min || offsetTop > max){
              const targetTop = offsetTop - 0.2 * containerOffsetHeight
              this.safeScrollTo(container, targetTop,0,true)
          }
        }
        this.setState({
            currentListNo: curHeading.listNo,
        });
    }, 300);

    winHashChange = () => {
        this.scrollToTarget(this.state.navStructure);
    };

    updateHash(value) {
        if (this.updateHashTimeout) {
            clearTimeout(this.updateHashTimeout);
        }

        this.updateHashTimeout = setTimeout(() => {
            window.history.replaceState(
                {},
                '',
                `${window.location.pathname}${window.location.search}#${value}`
            );
        }, 0);
    }

    render() {
      const tBlocks = this.getNavStructure().map((t) => {
        const cls = `title-anchor title-level${t.level} ${
          this.state.currentListNo === t.listNo ? 'active' : ''
        }`;
      
        return (
          <div
            className={cls}
                onClick={(evt) => {
                const currentHash = this.props.declarative
                    ? `${t.listNo}-${t.text}` // 加入listNo确保hash唯一ZZ
                    : `heading-${t.index}`;

                // Avoid execution the callback `onHashChange` when clicking current nav item
                if (t.listNo !== this.state.currentListNo) {
                    // Hash changing callback
                    this.props.onHashChange(currentHash, this.getCurrentHashValue());
                }

                // Nav item clicking callback
                this.props.onNavItemClick(evt, evt.target, currentHash);

                this.updateHash(currentHash);
                this.scrollToTarget(currentHash);
                this.setState({
                    currentListNo: t.listNo,
                });
            }}
              key={`title_anchor_${Math.random().toString(36).substring(2)}`}>
              {this.props.ordered ? <small>{t.listNo}</small> : null}
              {t.text}
        </div>);
        });

        return (
            <div className={`markdown-navigation ${this.props.className}`}>
                {tBlocks}
            </div>
        );
    }
}

export default MarkdownNavbar;
