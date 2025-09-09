<template>
  <div class="login-panel">
    <div class="login-panel-body" :class="{'transform-active':type}">
      <div class="login-panel-image">
        <a-button class="switch-button" shape="round" @click="handleSwitch">
          {{ type?'去登录':'去注册' }}
        </a-button>
      </div>
      <div class="login-panel-content">
        <transition name="fade" mode="out-in">
          <div v-if="!type" class="login-panel-content-body">
            <div class="login-panel-content-header">
              <div class="login-header-type" :class="{'type-active': loginType === 0}" @click="handleLoginChange(0)">
                账号登录
              </div>
              <div class="login-header-type" :class="{'type-active': loginType === 1}" @click="handleLoginChange(1)">
                短信登录
              </div>
            </div>
            <div class="login-panel-content-form">
              <LoginAccount v-if="loginType === 0" />
              <LoginTelephone v-else />
            </div>
          </div>
          <div v-else class="login-panel-content-body">
            <div class="login-panel-content-header">
              <div class="login-header-type type-active">
                注册
              </div>
            </div>
            <div class="login-panel-content-form">
              <RegisterPanel />
            </div>
          </div>
        </transition>
      </div>
      <div class="login-panel-close" @click="handleClose">
        <i-close size="24" fill="currentColor" />
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import {disabledBodyScroll, enabledBodyScroll} from "@/assets/utils/utils.ts";
  import LoginAccount from './LoginAccount.vue';
  import LoginTelephone from './LoginTelephone.vue';
  import RegisterPanel from './RegisterPanel.vue';

  export default {
    name: "LoginPanel",
    components: {
      LoginAccount,
      LoginTelephone,
      RegisterPanel
    },
    provide() {
      // 使用函数的形式，可以访问到 `this`
      return {
        handleSwitch: this.handleSwitch
      }
    },
    data() {
      return {
        type: 0, // 0:login, 1:register,
        loginType: 0, // 0:账密登录 2:手机登录,
      }
    },
    methods: {
      ...mapMutations(["changeLogin"]),
      handleSwitch() {
        this.type = this.type ? 0 : 1;
      },
      handleClose() {
        this.changeLogin(false);
      },
      handleLoginChange(loginType) {
        this.loginType = loginType;
      }
    },
    created() {
      disabledBodyScroll();
    },
    beforeUnmount() {
      enabledBodyScroll();
    }
  }
</script>

<style lang="scss" scoped>
  .login-panel {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    background-color: rgb(0, 0, 0, .45);

    .login-panel-body {
      position: relative;
      display: flex;
      width: 790px;
      height: 500px;
      color: var(--youyu-login-color);
      background-color: var(--youyu-login-background);
      box-shadow: var(--youyu-shadow1);
      transition: .6s;


      .login-panel-image {
        z-index: 10;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 270px;
        height: 100%;
        background-image: url('https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/background/gaoqi_hangpai.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        opacity: .8;
        transition: .6s;

        .switch-button {
          margin-bottom: 20px;
          font-weight: bold;

          /* background-color: rgba(255, 255, 255, 0.7); */
        }
      }

      .login-panel-content {
        width: 520px;
        height: 100%;
        transition: .6s;

        .login-panel-content-body {
          display: flex;
          flex-direction: column;
          height: 100%;

          .login-panel-content-header {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
            height: 50px;
            background-color: #fbfbfc;

            .login-header-type {
              display: flex;
              flex: 1;
              align-items: center;
              justify-content: center;
              height: 100%;
              font-size: 18px;
              font-weight: bold;
              color: #637792;
              text-align: center;
              background-color: var(--youyu-background2);
              cursor: pointer;

              &.type-active {
                background-color: var(--youyu-background1) !important;

                /* color: white; */
              }
            }
          }

          .login-panel-content-form {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            background-color: var(--youyu-background1);
          }
        }
      }

      .login-panel-close {
        position: absolute;
        top: -26px;
        right: -26px;
        color: #ebebeb;
        cursor: pointer;
        transition: .3s;

        &:hover {
          color: #fff;
        }
      }
    }
  }

  .transform-active {
    .login-panel-image {
      background-position-x: -380px;
      transform: translateX(520px);
    }

    .login-panel-content {
      transform: translateX(-270px);
    }
  }
</style>

<style lang="scss">
  /* .dark-theme {
    .login-panel-image {
      background-image: url('https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/login/tulip.jpg') !important;
    }
  } */
</style>
