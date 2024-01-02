<template>
  <div class="login-account">
    <div class="login-form-container">
      <div class="tip-box">
        <a-alert type="error" :message="tip.message" banner closable v-if="tip.showTip" @close="tip.showTip = false"/>
      </div>
      <a-form
        :model="formState"
        class="login-form">
        <a-form-item label="" v-bind="validateInfos.username">
          <a-input v-model:value="formState.username"
                   size="large"
                   :maxlength="30"
                   placeholder="手机号/邮箱">
            <template #prefix>
              <i-user fill="#c0c4cc"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="" v-bind="validateInfos.password">
          <a-input-password v-model:value="formState.password"
                            size="large"
                            :maxlength="30"
                            placeholder="密码">
            <template #prefix>
              <i-lock fill="#c0c4cc"/>
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary"
                    size="large"
                    block
                    html-type="submit"
                    class="login-form-button"
                    :loading="loading"
                    @click.prevent="onSubmit">
            登录
          </a-button>
          <div class="other-tips">
            <a class="forget-password" @click="handleSwitch">注册账号？</a>或者
            <a class="forget-password">忘记密码？</a>
          </div>
        </a-form-item>
      </a-form>
    </div>
    <div class="social-account-title">社交账号登录</div>
    <div class="social-account-tag mt-10">
      <div class="tag-item tag-wechat" title="微信">
        <img src="/static/images/logo/wechat.png" alt="" @click="onSocialConnect('wechat')"/>
      </div>
      <div class="tag-item tag-qq" title="QQ">
        <img src="/static/images/logo/qq.png" alt="" @click="onSocialConnect('qq')"/>
      </div>
      <div class="tag-item tag-github" title="Github">
        <img src="/static/images/logo/github.png" alt="" @click="onSocialConnect('github')"/>
      </div>
      <div class="tag-item tag-alipay" title="支付宝">
        <img src="/static/images/logo/alipay.png" alt="" @click="onSocialConnect('alipay')"/>
      </div>
      <div class="tag-item tag-weibo" title="微博">
        <img src="/static/images/logo/weibo.png" alt="" @click="onSocialConnect('weibo')"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, toRaw, inject} from 'vue';
import {useStore} from 'vuex';
import {message} from 'ant-design-vue';
import Cookies from "js-cookie";
import {generateAuthRoutes} from "@/router/config/useGenerateRoutes";

const {commit, dispatch} = useStore();
import {Form} from 'ant-design-vue';

const useForm = Form.useForm;
const handleSwitch = inject('handleSwitch')

const formState = reactive({
  username: '',
  password: '',
  grant_type: 'password', // oauth认证方式
  authType: 'password' // 校验方式设置成密码模式
});

const tip = reactive({
  showTip: false,
  message: "账号或密码错误"
})

const loading = ref(false);

const rulesRef = reactive({
  username: [{required: true, message: '请输入账号'}],
  password: [{required: true, message: '请输入密码'}],
});

const {resetFields, validate, validateInfos} = useForm(formState, rulesRef);

const onSubmit = () => {
  validate().then(() => {
    tip.showTip = false;
    loading.value = true;
    handleLogin(toRaw(formState));
  }).catch(err => {
    console.log('error', err);
  });
};

const handleLogin = (form) => {
  dispatch('token', form).then(res => {
    const {userInfo, access_token, refresh_token} = res.data;
    message.success(`欢迎回来，${userInfo.nickname}`);
    commit("changeLogin", false);
    commit("changeUser", userInfo);
    Cookies.set("access_token", access_token, {expires: 7});
    Cookies.set("refresh_token", refresh_token, {expires: 30});
    // 生成权限路由
    generateAuthRoutes();
  }).catch(e => {
    tip.showTip = true;
    tip.message = e.message;
  }).finally(_ => {
    loading.value = false;
  })
}

const onSocialConnect = (type: string) => {
  if (['qq', 'github']) {
    dispatch('getConnectURL', {type}).then(res => {
      location.href = res.data;
    })
  }
}
</script>

<style lang="scss" scoped>
.login-account {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .login-form-container {
    width: 320px;
    /*background-color: skyblue;*/
  }

  .tip-box {
    position: absolute;
    width: 320px;
    top: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .other-tips {
    margin-top: 10px;

    .forget-password {

    }
  }

  .social-account-title {
    display: flex;
    justify-content: center;
    position: relative;
    color: var(--youyu-body-text1);

    &:before, &:after {
      content: "";
      position: absolute;
      height: 1px;
      width: 30px;
      background-color: var(--youyu-body-text1);
    }

    &:before {
      top: 11px;
      left: -35px;
    }

    &:after {
      top: 11px;
      left: 90px;
    }
  }

  .social-account-tag {
    display: flex;

    .tag-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      width: 32px;
      border-radius: 50%;
      cursor: pointer;
      overflow: hidden;

      img {
        position: relative;
      }

      &:nth-child(n+2) {
        margin-left: 10px;
      }

      &.tag-wechat {
        background-color: #2fd859;
      }

      &.tag-qq {
        background-color: #1bc1fa;
      }

      &.tag-alipay {
        background-color: #06b4fd;

        img {
          left: 1px;
        }
      }

      &.tag-github {
        background-color: #1f2328;
      }

      &.tag-weibo {
        background-color: #fb5555;
      }
    }
  }

}
</style>
