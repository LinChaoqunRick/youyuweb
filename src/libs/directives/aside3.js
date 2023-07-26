import {getElementTop} from "@/assets/utils/utils";
import {useResizeObserver} from '@vueuse/core'

/**
 *  cacheTop: 变化方向时，记录变化时刻的elementTop值
 *  asideParent: aside的外层元素
 *
 */

export default {
  mounted(el, binding) {
    let header, footer, aside, asideParent, elInitTop, cacheTop;

    const defaultGap = 8;

    function handleScroll() {
      let beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      return () => {
        elInitTop = getElementTop(asideParent);

        let afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let dir = afterScrollTop - beforeScrollTop >= 0 ? 1 : 0;

        beforeScrollTop = afterScrollTop;

        let windowScrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
        let windowScrollTop = document.documentElement.scrollTop;

        // 如果aside高度比较小，直接sticky
        if (aside.clientHeight < document.documentElement.offsetHeight - header.offsetHeight) {
          aside.style.cssText = `position: sticky;top: ${header.clientHeight + defaultGap}px`
          return;
        }

        // 计算asideParent内容区域高度， 如果aside高度与asideParent内容区域高度一致，就是参考元素高度没aside高
        const asideParentStyle = getComputedStyle(asideParent);
        const asideParentContentHeight = asideParent.offsetHeight - parseInt(asideParentStyle.paddingTop) - parseInt(asideParentStyle.paddingBottom);
        if (aside.offsetHeight >= asideParentContentHeight) {
          cacheTop = 0;
          aside.style.cssText = `position: relative;top:0px;`;
          return;
        }

        if (dir) { // 向下滚动
          if (windowScrollBottom >= getElementTop(footer)) { // 超过footer
            aside.style.cssText = `position: absolute;bottom: 0px;`
            cacheTop = getElementTop(aside) - elInitTop; // absolute是可以使用getElementTop计算
            cacheTop = cacheTop > 0 ? cacheTop : 0;
            // console.log("down 1", cacheTop);
          } else if (windowScrollBottom >= getElementTop(aside) + aside.clientHeight + defaultGap) { // 超过下限
            cacheTop = windowScrollBottom - elInitTop - aside.clientHeight - defaultGap;
            cacheTop = cacheTop > 0 ? cacheTop : 0;
            // console.log("down 2", cacheTop);
            aside.style.cssText = `position: fixed;bottom: 8px;`;
          } else { // 其他
            // console.log("down 3")
            aside.style.cssText = `position: relative;top: ${cacheTop}px`;
          }
        } else { // 向上滚动
          if (Math.floor(windowScrollTop + header.clientHeight + defaultGap) <= getElementTop(aside)) { // 超过上限
            cacheTop = windowScrollTop - (elInitTop - header.clientHeight - defaultGap);
            cacheTop = cacheTop > 0 ? cacheTop : 0;
            // console.log("up 1", cacheTop);
            aside.style.cssText = `position: sticky;top: ${header.clientHeight + defaultGap}px;`
          } else { // 其他
            // console.log("up 2")
            aside.style.cssText = `position: relative;top: ${cacheTop}px`;
          }
        }
      }
    }

    el.onScroll = handleScroll();

    header = document.getElementById("header");
    footer = document.getElementById("footer");
    cacheTop = 0;
    aside = el;
    asideParent = el.parentNode;
    document.addEventListener("scroll", el.onScroll, false);
    const {stop} = useResizeObserver(document.getElementById("app"), (entries) => {
      el.onScroll()
    })
    el.stopObserve = stop;
  },

  beforeUnmount(el) {
    el.stopObserve();
  },

  unmounted(el) {
    document.removeEventListener("scroll", el.onScroll, false);
  }
}
