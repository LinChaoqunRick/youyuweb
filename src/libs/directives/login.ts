/**
 * 在元素上使用v-login,代表这个操作需要登陆后才能执行，如果没有登录的话，会弹出登录框。如果用户已登录，则相当于@click。
 * 案例：
 * <div v-login="onSetLike">点赞</div>
 */
import type {DirectiveBinding, ref} from 'vue';
import store from "@/store";

export default {
  created(el: HTMLElement, binding: DirectiveBinding) {
    const callback = binding.value;
    el.addEventListener('click', (e: Event) => {
      /*const event = e || window.event;
      if (event.stopPropagation){
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }*/
      if (!store.getters.isLogin) {
        store.commit('changeLogin', true);
      } else {
        callback && callback();
      }
    }, false);
  }
}
