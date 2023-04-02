<template>
  <div class="center-account">
    <div class="center-title">
      账号设置
    </div>
    <div class="center-content">
      <div class="setting-item">
        <div class="setting-item-title">手机</div>
        <div class="setting-item-value">{{user.username}}</div>
        <div class="setting-item-operate">
          <a-button type="link">换绑</a-button>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-title">邮箱</div>
        <div class="setting-item-value">{{user.email}}</div>
        <div class="setting-item-operate">
          <a-button type="link">{{user.email?'修改':'绑定'}}</a-button>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-title">个人主页</div>
        <div class="setting-item-value">{{user.homepage}}</div>
        <div class="setting-item-operate">
          <a-button type="link">编辑</a-button>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-title">密码</div>
        <div class="setting-item-value"></div>
        <div class="setting-item-operate">
          <a-button type="link">修改</a-button>
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
</template>

<script setup lang="ts">
  import {useStore} from "vuex";
  import {computed, ref} from "vue";

  const {getters, dispatch} = useStore();
  const user = ref({});
  const userInfo = computed(() => getters['userInfo']);

  function initData() {
    dispatch("getUserById", {userId: userInfo.value.id}).then(res => {
      user.value = res.data;
    });
  }

  initData();
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
      }
    }
  }
</style>
