const DISTANCE = 60;
const DURATION = 500;

const animationMap = new WeakMap();

const ob = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = animationMap.get(entry.target);
      animation.play();
      ob.unobserve(entry.target);
    }
  }
})

function isBelowViewPoint(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top > window.innerHeight;
}

export default {
  mounted(el: HTMLElement) {
    if (!isBelowViewPoint(el)) {
      return;
    }
    const animation = el.animate([
      {
        transform: `translateY(${DISTANCE}px)`,
        opacity: 0.5
      },
      {
        transform: 'translateY(0)',
        opacity: 1
      }
    ], {
      duration: DURATION,
      easing: 'ease'
    });
    animation.pause();
    animationMap.set(el, animation);
    ob.observe(el);
  },

  unmounted(el: HTMLElement) {
    ob.unobserve(el);
  }
}
