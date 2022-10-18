import {ref} from "vue";
import {getElementTop} from "@/assets/utils/utils";

const phase = ref(1);
let aside, footer, asideTop;

function handleScroll() {
  let windowScrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight; // 滚动条的底部的高度
  let footerTop = getElementTop(footer); // footer的顶部绝对位置
  let asideBottom = asideTop + aside.clientHeight;  // aside底部的绝对位置
  if (asideBottom < document.documentElement.clientHeight) { // aside高度还不足整个可见区域
    aside.style.cssText = `position: sticky;top: ${asideTop}px`
    return;
  }
  if (windowScrollBottom > footerTop) { // 阶段3 sticky
    phase.value = 3;
  } else if (windowScrollBottom > asideBottom && windowScrollBottom < footerTop) {   // 阶段2 fixed
    phase.value = 2;
  } else if (windowScrollBottom < asideBottom) {  // 阶段1 relative
    phase.value = 1;
  }
  aside.className = `phase-${phase.value}`;
}

function bindEvent() {
  window.addEventListener("scroll", handleScroll, false);
}

function unbindEvent() {
  window.removeEventListener("scroll", handleScroll, false);
}

export default {
  mounted(el) {
    aside = el;
    footer = document.getElementById('footer');
    asideTop = getElementTop(aside);
    bindEvent();
  },

  unmounted() {
    unbindEvent();
  }
}
