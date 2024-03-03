const DURATION = 8 * 1000;

const animationMap = new WeakMap();

export default {
  mounted(el: HTMLElement, binding) {
    // const bodyClientWidth = document.body.clientWidth;
    // const speed = bodyClientWidth / DURATION;
    const rect = el.getBoundingClientRect();
    const translateX = Math.random() * 70 + 5;
    const animation = el.animate(
      [
        {
          transform: `translateX(100vw) translateY(${translateX}vh)`
        },
        {
          transform: `translateX(calc(0vw - ${rect.width + 20}px)) translateY(${translateX}vh)`
        }
      ],
      {
        duration: DURATION,
        easing: 'linear',
        fill: 'forwards'
      }
    );
    animation.play();
    animationMap.set(el, animation);
    setTimeout(() => {
      binding?.value();
    }, DURATION + 500);

    const pause = () => {
      animation.pause();
    };

    const play = () => {
      animation.play();
    };

    el.addEventListener('mouseover', pause, false);
    el.addEventListener('mouseout', play, false);
  },

  unmount(el: HTMLElement) {
  }
};
