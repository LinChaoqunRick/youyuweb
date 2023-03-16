import {getElementTop} from "@/assets/utils/utils";

/**
 *  cacheTop: 变化方向时，记录变化时刻的elementTop值
 */
let header, footer, aside, elInitTop, asideRight, parent, filler, cacheTop;


function handleScroll() {
  let beforeScrollTop = document.documentElement.scrollTop;

  return () => {
    let afterScrollTop = document.documentElement.scrollTop;
    let dir = afterScrollTop - beforeScrollTop > 0 ? 1 : 0;
    beforeScrollTop = afterScrollTop;

    let windowScrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
    let windowScrollTop = document.documentElement.scrollTop;

    // 如果aside高度比较小，直接sticky
    if (aside.clientHeight < document.documentElement.clientHeight - footer.clientHeight - header.clientHeight) {
      aside.style.cssText = `position: sticky;top: ${elInitTop}px`
      return;
    }

    // parent.style.minHeight = `${aside.clientHeight}px;`;
    parent.style.display = `flex`;
    parent.style.alignItems = `flex-start`;
    filler.style.cssText = `height: ${aside.clientHeight}px;`;

    if (dir) { // 向下滚动
      if (windowScrollBottom > getElementTop(footer)) { // 超过footer
        // console.log("down 1")
        aside.style.cssText = `position: absolute;bottom: 0px;`
        cacheTop = getElementTop(aside) - elInitTop; // absolute是可以使用getElementTop计算
      } else if (windowScrollBottom >= getElementTop(aside) + aside.clientHeight) { // 超过下限
        cacheTop = windowScrollBottom - elInitTop - aside.clientHeight;
        // console.log("down 2", cacheTop)
        aside.style.cssText = `position: fixed;bottom: 8px;`;
      } else { // 其他
        // console.log("down 3")
        aside.style.cssText = `position: relative;top: ${cacheTop}px`;
      }
    } else { // 向上滚动
      if (windowScrollTop < getElementTop(aside) - header.clientHeight) { // 超过上限
        cacheTop = windowScrollTop;
        // console.log("up 1", cacheTop)
        aside.style.cssText = `position: sticky;top: ${elInitTop}px;`
      } else { // 其他
        // console.log("up 2")
        aside.style.cssText = `position: relative;top: ${cacheTop}px`;
      }
    }
  }
}

const onScroll = handleScroll();

export default {
  mounted(el, binding) {
    header = document.getElementById("header");
    footer = document.getElementById("footer");
    asideRight = document.getElementById("aside-right");
    cacheTop = 0;
    aside = el;
    elInitTop = getElementTop(aside);
    parent = el.parentNode;
    filler = document.createElement("div");
    parent.appendChild(filler);
    document.addEventListener("scroll", onScroll, false);
  },

  unmounted() {
    document.removeEventListener("scroll", onScroll, false);
  }
}
