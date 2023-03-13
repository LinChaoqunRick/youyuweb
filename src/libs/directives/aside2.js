import {getElementTop} from "@/assets/utils/utils";

/**
 *  参照元素id必须为`aside-right`
 *  且参照元素最好透明
 */

let youyuApp, header, footer, aside, elInitTop, asideRight;
let cacheTop; // cacheTop: 变化方向时，记录变化时刻的elementTop值

function handleScroll() {
  let beforeScrollTop = document.documentElement.scrollTop;
  return () => {
    let afterScrollTop = document.documentElement.scrollTop;
    let dir = afterScrollTop - beforeScrollTop > 0 ? 1 : 0;
    beforeScrollTop = afterScrollTop;

    let windowScrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
    let windowScrollTop = document.documentElement.scrollTop;
    let footerTop = getElementTop(footer);
    let asideBottom = getElementTop(aside) + aside.clientHeight;

    // 如果aside高度比较小，直接sticky
    if (aside.clientHeight < document.documentElement.clientHeight - footer.clientHeight - header.clientHeight) {
      aside.style.cssText = `position: sticky;top: ${elInitTop}px`
      return;
    }

    asideRight.style.minHeight = `${aside.clientHeight}px`;

    if (dir && windowScrollBottom > asideBottom) { // 如果向下滚动且超过了下限
      if (youyuApp.clientHeight < document.body.clientHeight) {
        aside.style.cssText = `position: relative;`;
      } else {
        cacheTop = getElementTop(aside);
        aside.style.cssText = `position: absolute;bottom: ${(footerTop - windowScrollBottom) > 0 ? footerTop - windowScrollBottom : 0}px`;
      }
    } else if (!dir) { // 向上滚动
      if (windowScrollTop < elInitTop - 68) { // 如果超过了header + 初始位置
        cacheTop = elInitTop;
        aside.style.cssText = `position: relative;top: 0px`;
      } else if (windowScrollTop < getElementTop(aside) - header.clientHeight) { // 如果超过了上限
        cacheTop = getElementTop(aside);
        aside.style.cssText = `position: sticky;top: 68px`;
      }
    } else {
      aside.style.cssText = `position: relative;top: ${cacheTop - elInitTop}px`;
    }
  }
}

const onScroll = handleScroll();

export default {
  mounted(el, binding) {
    youyuApp = document.getElementById("youyu-app");
    header = document.getElementById("header");
    footer = document.getElementById("footer");
    asideRight = document.getElementById("aside-right");
    aside = el;
    elInitTop = getElementTop(aside);
    cacheTop = elInitTop;
    document.addEventListener("scroll", onScroll, false);
  },

  unmounted() {
    document.removeEventListener("scroll", onScroll, false);
  }
}

// const observer = new MutationObserver((mutationList) => {
//   // if (height !== contentRef.current?.clientHeight) {
//   console.log("高度变化了！");
//   //   setHeight(contentRef.current.clientHeight);
//   // }
// });
//
// observer.observe(document);
