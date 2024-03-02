const DURATION = 6500;

const animationMap = new WeakMap();

const ob = new IntersectionObserver(entries => {
  for (const entry of entries) {
    console.log(1123);
    if (entry.boundingClientRect.left < 0) {
      entry.target.onShowFinish();
      ob.unobserve(entry.target);
    }
  }
})


export default {
  mounted(el: HTMLElement, binding) {
    el.onShowFinish = binding.value;
    const rect = el.getBoundingClientRect();
    const animation = el.animate([
      {
        transform: `translateX(100vw)`,
      },
      {
        transform: `translateX(calc(0vw - ${rect.width + 20}px))`,
      }
    ], {
      duration: DURATION,
      easing: 'linear'
    });
    animation.play();
    animationMap.set(el, animation);
    setTimeout(() => {
      ob.observe(el);
    }, 500)
  },

  unmount(el: HTMLElement) {
    ob.unobserve(el);
  }
}
