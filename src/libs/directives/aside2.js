import {getElementTop} from "@/assets/utils/utils.js";

let header, footer, aside, asideTop;

function handleScroll(dir) {
  let windowScrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
  let windowScrollTop = document.documentElement.scrollTop;
  let footerTop = getElementTop(footer);
  let asideBottom = getElementTop(aside) + aside.clientHeight;

  if (aside.clientHeight < document.documentElement.clientHeight - footer.clientHeight - header.clientHeight) {
    aside.style.cssText = `position: sticky;top: ${asideTop}px`
    return;
  }

  if ((windowScrollBottom > asideBottom) && dir > 0) { // 如果超过了下限
    aside.style.cssText = `position: absolute;bottom: ${(footerTop - windowScrollBottom) > 0 ? footerTop - windowScrollBottom : 0}px`;
  } else if (windowScrollTop < getElementTop(aside) && dir < 0) { // 如果超过了上限
    aside.style.cssText = `position: absolute;top: ${windowScrollTop}px`;
  }
}

function listenScroll(fn) {
  let beforeScrollTop = document.documentElement.scrollTop;
  window.onscroll = () => {
    let afterScrollTop = document.documentElement.scrollTop,
      delta = afterScrollTop - beforeScrollTop;
    if (delta === 0) return false;
    fn(delta > 0 ? 100 : -100);
    beforeScrollTop = afterScrollTop;
  }
}

export default {
  mounted(el) {
    header = document.getElementById("header");
    footer = document.getElementById("footer");
    aside = el;
    asideTop = getElementTop(aside);
    listenScroll(handleScroll)
  },

  unmounted() {
    window.onscroll = null;
  }
}
