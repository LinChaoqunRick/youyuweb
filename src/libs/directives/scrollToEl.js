import {getElementTop} from "@/assets/utils/utils";

const handleScroll = (el, callback) => {
  return () => {
    let windowScrollTop = document.documentElement.scrollTop;
    if (windowScrollTop >= getElementTop(el)) {
      console.log(getElementTop(el));
    }
  }
};

export default {
  mounted(el, binding) {

    document.addEventListener("scroll", handleScroll(el, binding.value), false);
  },

  unmounted(el, binding) {
    document.removeEventListener("scroll", handleScroll(el, binding.value), false);
  }
};
