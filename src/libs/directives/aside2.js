import {getElementTop} from "@/assets/utils/utils.js";

let header, footer, aside, asideTop;

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

    if ((windowScrollBottom > asideBottom) && dir) { // 如果超过了下限
      aside.style.cssText = `position: absolute;bottom: ${(footerTop - windowScrollBottom) > 0 ? footerTop - windowScrollBottom : 0}px`;
    } else if (windowScrollTop < getElementTop(aside) - header.clientHeight && !dir) { // 如果超过了上限
      aside.style.cssText = `position: absolute;top: ${windowScrollTop}px`;
      console.log(123123);
    } else {
      // console.log(123123);
    }
  }
}

const scrollFn = handleScroll();

export default {
  mounted(el) {
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
