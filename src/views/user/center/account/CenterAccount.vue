<template>
  <div class="center-account">
    <div class="center-title">
      账号设置
    </div>
    <div class="center-content">
      <div class="setting-item">
        <div class="setting-item-title">手机</div>
        <div class="setting-item-value">{{ user.username }}</div>
        <div class="setting-item-operate">
          <a-button type="link" @click="onChangeTelephone">{{ user.username ? '换绑' : '绑定' }}</a-button>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-title">邮箱</div>
        <div class="setting-item-value">{{ user.email }}</div>
        <div class="setting-item-operate">
          <a-button type="link" @click="onEditEmail">{{ user.email ? '修改' : '绑定' }}</a-button>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-title">个人主页</div>
        <div class="setting-item-value">{{ user.homepage }}</div>
        <div class="setting-item-operate">
          <a-button type="link" @click="onEditHomepage">编辑</a-button>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-title">密码</div>
        <div class="setting-item-value"></div>
        <div class="setting-item-operate">
          <a-button type="link" @click="onChangePassword">修改</a-button>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-title">社交账号</div>
        <div class="setting-item-value social-account-tag">
          <div class="tag-item tag-wechat" :class="{'active': false}"
               :title="'微信:' + (user.wxId ? '已绑定' : '未绑定')">
            <img src="/static/images/logo/wechat.png" alt="" @click="onSocialBind('wechat', user.wxId)"/>
          </div>
          <div class="tag-item tag-qq" :class="{'active': false}" :title="'QQ:' + (user.qqId ? '已绑定' : '未绑定')">
            <img src="/static/images/logo/qq.png" alt="" @click="onSocialBind('qq', user.qqId)"/>
          </div>
          <div class="tag-item tag-github" :class="{'active': user.githubId}"
               :title="'Github:' + (user.githubId ? '已绑定' : '未绑定')">
            <img src="/static/images/logo/github.png" alt="" @click="onSocialBind('github', user.githubId)"/>
          </div>
          <div class="tag-item tag-alipay" :class="{'active': false}"
               :title="'支付宝:' + (user.alipayId ? '已绑定' : '未绑定')">
            <img src="/static/images/logo/alipay.png" alt="" @click="onSocialBind('alipay', user.alipayId)"/>
          </div>
          <div class="tag-item tag-weibo" :class="{'active': false}"
               :title="'微博:' + (user.weiboId ? '已绑定' : '未绑定')">
            <img src="/static/images/logo/weibo.png" alt="" @click="onSocialBind('weibo', user.weiboId)"/>
          </div>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-title">账号注销</div>
        <div class="setting-item-value"></div>
        <div class="setting-item-operate">
          <a-button type="link">注销</a-button>
        </div>
      </div>
    </div>
  </div>
  <a-modal
    v-model:visible="accountBindModalVisible"
    title="Title"
    :confirm-loading="accountBindConfirmLoading"
    @ok="handleOk"
  >
    <p>{{ modalText }}</p>
  </a-modal>
</template>

<script setup lang="ts">
import {useStore} from "vuex";
import {computed, ref} from "vue";
import Homepage from './components/Homepage.vue';
import Telephone from './components/Telephone.vue';
import Password from "./components/Password.vue";
import Email from "./components/Email.vue";
import openModal from "@/libs/tools/openModal";

const {getters, dispatch} = useStore();
const user = ref({});
const userInfo = computed(() => getters['userInfo']);

function initData() {
  dispatch("getUserDetail", {userId: userInfo.value.id}).then(res => {
    user.value = res.data;
  });
}

initData();

async function onEditHomepage() {
  openModal({
    component: Homepage,
    title: '个人主页设置',
    maskClosable: false,
    componentProps: {
      user: user.value
    }
  }).then(res => {
    initData();
  }).catch(console.log)
}

async function onEditEmail() {
  openModal({
    component: Email,
    title: '邮箱设置',
    maskClosable: false,
    componentProps: {
      user: user.value
    },
    width: '320px',
  }).then(res => {
    initData();
  }).catch(console.log)
}

async function onChangeTelephone() {
  openModal({
    component: Telephone,
    title: '换绑手机',
    maskClosable: false,
    componentProps: {
      user: user.value
    },
    width: '320px',
    wrapClassName: 'change-telephone-modal'
  }).then(res => {
    initData();
  }).catch(console.log)
}

async function onChangePassword() {
  openModal({
    component: Password,
    title: '修改密码',
    maskClosable: false,
    componentProps: {
      user: user.value
    },
    width: '320px',
    wrapClassName: 'change-password-modal'
  }).then(res => {

  })
}

const onSocialBind = (type: string, bindId: string) => {

}
</script>

<style lang="scss" scoped>
.center-account {
  padding: 10px 16px;

  .center-title {
    font-size: 18px;
    font-weight: bold;
  }

  .center-content {
    padding: 16px 8px;

    .setting-item {
      display: flex;
      align-items: center;
      padding: 20px 0;
      border-bottom: var(--youyu-border);

      &:first-child {
        border-top: var(--youyu-border);
      }

      .setting-item-title {
        width: 90px;
      }

      .setting-item-operate {
        margin-left: auto;
      }

      .social-account-tag {
        display: flex;
        margin-left: auto;
        margin-right: 16px;

        .tag-item {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          cursor: pointer;
          overflow: hidden;
          background-color: gray;

          img {
            position: relative;
            transform: scale(0.84);
          }

          &:nth-child(n+2) {
            margin-left: 4px;
          }

          &.active {
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
    }
  }
}
</style>

<style lang="scss">
.change-telephone-modal, .change-password-modal {
  .ant-modal-body {
    position: relative;
    padding: 10px 24px 20px 24px;

    .ant-form-item {
      /*margin-bottom: 20px;*/
    }
  }
}
</style>
