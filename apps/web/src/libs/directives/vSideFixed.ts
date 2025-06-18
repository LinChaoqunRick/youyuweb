import { getElementTop } from '@/assets/utils/utils';
import { useResizeObserver } from '@vueuse/core';

interface EventHTMLElement extends HTMLElement {
  handleFixed: (callback: () => void) => void;
  stopObserve: () => void;
}


/**
 *  cacheTop: 变化方向时，记录变化时刻的elementTop值
 *  asideParent: aside的外层元素
 *
 */
export default {
  mounted(el: EventHTMLElement) {
    const header: HTMLElement = document.getElementById('header')!;
    const footer: HTMLElement = document.getElementById('footer')!;
    const aside: HTMLElement = el;
    const asideParent: HTMLElement = el.parentNode as HTMLElement;
    let elInitTop: number;
    let cacheTop: number;

    const defaultGap = 8;

    function handleScroll() {
      let beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      return () => {
        elInitTop = getElementTop(asideParent);

        const afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const dir = afterScrollTop - beforeScrollTop >= 0 ? 1 : 0;

        beforeScrollTop = afterScrollTop;

        const windowScrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
        const windowScrollTop = document.documentElement.scrollTop;

        // 如果aside高度比较小，直接sticky
        if (elInitTop + aside.clientHeight < window.innerHeight) {
          aside.style.cssText = `position: sticky;top: ${header.clientHeight + defaultGap}px`;
          return;
        }

        // 计算asideParent内容区域高度， 如果aside高度与asideParent内容区域高度一致，就是参考元素高度没aside高
        const asideParentStyle = getComputedStyle(asideParent);
        const asideParentContentHeight =
          asideParent.offsetHeight - parseInt(asideParentStyle.paddingTop) - parseInt(asideParentStyle.paddingBottom);
        if (aside.offsetHeight >= asideParentContentHeight) {
          cacheTop = 0;
          aside.style.cssText = `position: relative;top:0px;`;
          return;
        }

        if (dir) {
          // 向下滚动
          if (windowScrollBottom >= getElementTop(footer)) {
            // 超过footer
            aside.style.cssText = `position: absolute;bottom: 0px;`;
            cacheTop = getElementTop(aside) - elInitTop; // absolute是可以使用getElementTop计算
            cacheTop = cacheTop > 0 ? cacheTop : 0;
            // console.log("down 1", cacheTop);
          } else if (windowScrollBottom >= getElementTop(aside) + aside.clientHeight + defaultGap) {
            // 超过下限
            cacheTop = windowScrollBottom - elInitTop - aside.clientHeight - defaultGap;
            cacheTop = cacheTop > 0 ? cacheTop : 0;
            // console.log("down 2", cacheTop);
            aside.style.cssText = `position: fixed;bottom: 8px;`;
          } else {
            // 其他
            // console.log("down 3")
            aside.style.cssText = `position: relative;top: ${cacheTop}px`;
          }
        } else {
          // 向上滚动
          if (Math.floor(windowScrollTop + header.clientHeight + defaultGap) <= getElementTop(aside)) {
            // 超过上限
            cacheTop = windowScrollTop - (elInitTop - header.clientHeight - defaultGap);
            cacheTop = cacheTop > 0 ? cacheTop : 0;
            // console.log("up 1", cacheTop);
            aside.style.cssText = `position: sticky;top: ${header.clientHeight + defaultGap}px;`;
          } else {
            // 其他
            // console.log("up 2")
            aside.style.cssText = `position: relative;top: ${cacheTop}px`;
          }
        }
      };
    }

    el.handleFixed = handleScroll();

    cacheTop = 0;
    document.addEventListener('scroll', el.handleFixed, false);
    const { stop } = useResizeObserver(document.getElementById('app'), () => {
      el.handleFixed();
    });
    el.stopObserve = stop;
  },

  beforeUnmount(el: EventHTMLElement) {
    el.stopObserve();
  },

  unmounted(el: EventHTMLElement) {
    document.removeEventListener('scroll', el.handleFixed, false);
  }
};
