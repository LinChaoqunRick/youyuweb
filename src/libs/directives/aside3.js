import {getElementTop} from "@/assets/utils/utils";

/**
 *  cacheTop: 变化方向时，记录变化时刻的elementTop值
 *  asideParent: 包含着aside元素和参考元素的那个元素
 */
let header, footer, aside, asideParent, elInitTop, cacheTop;


function handleScroll() {
  let beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  return () => {
    let afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let dir = afterScrollTop - beforeScrollTop > 0 ? 1 : 0;
    beforeScrollTop = afterScrollTop;

    let windowScrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
    let windowScrollTop = document.documentElement.scrollTop;

    // 如果aside高度比较小，直接sticky
    if (aside.clientHeight < document.documentElement.offsetHeight - header.offsetHeight) {
      aside.style.cssText = `position: sticky;top: ${elInitTop}px`
      return;
    }

    // 如果aside高度与asideParent一致，就是参考元素高度没aside高
    if (aside.offsetHeight >= asideParent.offsetHeight) {
      cacheTop = 0;
      aside.style.cssText = `position: relative;`;
      return;
    }

    if (dir) { // 向下滚动
      if (windowScrollBottom >= getElementTop(footer)) { // 超过footer
        aside.style.cssText = `position: absolute;bottom: 0px;`
        cacheTop = getElementTop(aside) - elInitTop; // absolute是可以使用getElementTop计算
        // console.log("down 1", cacheTop);
      } else if (windowScrollBottom >= getElementTop(aside) + aside.clientHeight + 8) { // 超过下限
        cacheTop = windowScrollBottom - elInitTop - aside.clientHeight - 8;
        // console.log("down 2", cacheTop);
        aside.style.cssText = `position: fixed;bottom: 8px;`;
      } else { // 其他
        // console.log("down 3")
        aside.style.cssText = `position: relative;top: ${cacheTop}px`;
      }
    } else { // 向上滚动
      if (windowScrollTop + header.clientHeight < getElementTop(aside)) { // 超过上限
        cacheTop = windowScrollTop;
        // console.log("up 1", cacheTop);
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
    cacheTop = 0;
    aside = el;
    asideParent = el.parentNode.parentNode;
    elInitTop = getElementTop(aside);
    document.addEventListener("scroll", onScroll, false);
  },

  unmounted() {
    document.removeEventListener("scroll", onScroll, false);
  }
}
