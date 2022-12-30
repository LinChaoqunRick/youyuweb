<template>
  <div class="login-panel">
    <div class="login-panel-body" :class="{'transform-active':type}">
      <div class="login-panel-image">
        <a-button class="switch-button" shape="round" @click="handleSwitch">{{type?'去登录':'去注册'}}</a-button>
      </div>
      <div class="login-panel-content">
        <transition name="fade" mode="out-in">
          <div class="login-panel-content-body" v-if="!type">
            <div class="login-panel-content-header">
              <div class="login-header-type" :class="{'type-active': loginType === 0}" @click="handleLoginChange(0)">
                账密登录
              </div>
              <div class="login-header-type" :class="{'type-active': loginType === 1}" @click="handleLoginChange(1)">
                手机登录
              </div>
            </div>
            <div class="login-panel-content-form">
              <LoginAccount v-if="loginType === 0"/>
            </div>
          </div>
          <div class="login-panel-content-body" v-else>
            <div class="login-panel-content-header">
              <div class="login-header-type type-active">注册</div>
            </div>
            <div class="login-panel-content-form">

            </div>
          </div>
        </transition>
      </div>
      <div class="login-panel-close" @click="handleClose">
        <icon-close size="24" fill="#fff"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import LoginAccount from './LoginAccount.vue'

  export default {
    name: "LoginPanel",
    components: {
      LoginAccount
    },
    data() {
      return {
        type: 0, // 0:login, 1:register,
        loginType: 0 // 0:账密登录 2:手机登录
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
  }
</script>

<style lang="scss" scoped>
  .login-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 2000;

    .login-panel-body {
      position: relative;
      display: flex;
      width: 790px;
      height: 500px;
      background-color: var(--youyu-login-background);
      color: var(--youyu-login-color);
      transition: .6s;


      .login-panel-image {
        background-image: url('https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/login/loginImg.jpg');
        background-size: contain;
        height: 100%;
        width: 270px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        transition: .6s;
        z-index: 10;

        .switch-button {
          margin-bottom: 20px;
          background-color: rgba(255, 255, 255, 0.7);
        }
      }

      .login-panel-content {
        height: 100%;
        width: 520px;
        transition: .6s;

        .login-panel-content-body {
          height: 100%;
          display: flex;
          flex-direction: column;

          .login-panel-content-header {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            height: 50px;
            background-color: #fbfbfc;

            .login-header-type {
              flex: 1;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              text-align: center;
              font-size: 18px;
              font-weight: bold;
              color: #637792;

              &.type-active {
                background-color: #edeeef;
                /*color: white;*/
              }
            }
          }

          .login-panel-content-form {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
          }
        }
      }

      .login-panel-close {
        position: absolute;
        top: -26px;
        right: -26px;
        cursor: pointer;
      }
    }
  }

  .transform-active {
    .login-panel-image {
      transform: translateX(520px);
    }

    .login-panel-content {
      transform: translateX(-270px);
    }
  }
</style>
