import {getElementTop} from "@/assets/utils/utils";

let header, footer, aside, asideTop;
let elInitTop, cacheTop; // cacheTop: 变化方向时，记录变化时候的elementTop值

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
      aside.style.cssText = `position: sticky;top: ${asideTop}px`
      return;
    }

    if ((windowScrollBottom > asideBottom) && dir) { // 向下滚动，如果超过了下限
      cacheTop = getElementTop(aside);
      aside.style.cssText = `position: absolute;bottom: ${(footerTop - windowScrollBottom) > 0 ? footerTop - windowScrollBottom : 0}px`;
    } else if (windowScrollTop < getElementTop(aside) - header.clientHeight && !dir) { // 如果超过了上限
      cacheTop = getElementTop(aside);
      aside.style.cssText = `position: sticky;top: ${asideTop}px`;
    } else {
      aside.style.cssText = `position: relative;top: ${cacheTop - elInitTop}px`;
    }
  }
}

const scrollFn = handleScroll();

export default {
  mounted(el, binding) {
    elInitTop = getElementTop(el);
    header = document.getElementById("header");
    footer = document.getElementById("footer");
    aside = el;
    asideTop = getElementTop(aside);
    window.addEventListener("scroll", scrollFn, false);
  },

  unmounted() {
    window.removeEventListener("scroll", scrollFn, false);
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
