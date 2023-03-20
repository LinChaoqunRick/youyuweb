import {getElementTop} from "@/assets/utils/utils";

/**
 *  cacheTop: 变化方向时，记录变化时刻的elementTop值
 */
let header, footer, aside, elInitTop, cacheTop, mainApp;


function handleScroll() {
  return () => {
    let windowScrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
    let windowScrollTop = document.documentElement.scrollTop;

    // 如果aside高度比较小，直接sticky
    if (aside.clientHeight < document.documentElement.clientHeight - footer.clientHeight - header.clientHeight) {
      aside.style.cssText = `position: sticky;top: ${elInitTop}px`
      return;
    }

    // 如果aside高度与mainApp一致，就是参考元素高度没aside高，不做变化直接relative
    if (aside.offsetHeight >= mainApp.offsetHeight) {
      aside.style.cssText = `position: relative;`;
      return;
    }

    // 如果不属于上面两种情况
    if (windowScrollBottom > getElementTop(footer)) { // 超过footer
      console.log(1);
      aside.style.cssText = `position: absolute;bottom:0`;
    } else if (windowScrollBottom > getElementTop(aside) + aside.clientHeight) { // 超过下限
      console.log(2);
      aside.style.cssText = `position: fixed;top:-${aside.clientHeight - (document.documentElement.clientHeight - 8)}px`;
    } else if (windowScrollTop < header.clientHeight) {
      console.log(3);
      aside.style.cssText = `position: relative;`;
    } else if (windowScrollTop < getElementTop(aside)) { //超过上限
      console.log(4);
      aside.style.cssText = `position: fixed;top:${elInitTop}px`;
    } else {
      console.log("other");
    }

  }
}

const onScroll = handleScroll();

export default {
  mounted(el, binding) {
    header = document.getElementById("header");
    footer = document.getElementById("footer");
    mainApp = document.getElementById("main-app");
    cacheTop = 0;
    aside = el;
    elInitTop = getElementTop(aside);
    document.addEventListener("scroll", onScroll, false);
  },

  unmounted() {
    document.removeEventListener("scroll", onScroll, false);
  }
}
