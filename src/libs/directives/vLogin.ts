/**
 * 在元素上使用v-login,代表这个操作需要登陆后才能执行，如果没有登录的话，会弹出登录框。如果用户已登录，则相当于@click。
 * 案例：
 * <div v-login="onSetLike">点赞</div>
 */
import type {DirectiveBinding} from 'vue';
import store from "@/store";

const isLogin = store.getters.isLogin;

export default {
  created(el: HTMLElement, binding: DirectiveBinding) {
    const callback = binding.value;
    el.addEventListener('click', () => {
      if (!isLogin) {
        store.commit('changeLogin', true);
      } else {
        callback && callback();
      }
    }, false);
  }
}
