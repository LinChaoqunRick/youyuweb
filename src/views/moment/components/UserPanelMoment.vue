<template>
  <div class="user-panel-moment">
    <div class="user-info">
      <div v-if="!isLogin" class="no-login-panel">
        <div class="basic-info">
          <div class="avatar cp" v-login>
            <img src="/static/images/avatar/default_avatar.png" alt="默认头像"/>
          </div>
          <div class="basic-data">
            <div class="nickname cp" v-login>登录 / 注册</div>
            <div class="signature">即刻玩转时刻</div>
          </div>
        </div>
        <div class="extra-info">
          <div class="data-item">
            <div class="data-value">-</div>
            <div class="data-title">时刻</div>
          </div>
          <div class="data-item">
            <div class="data-value">-</div>
            <div class="data-title">点赞</div>
          </div>
          <div class="data-item">
            <div class="data-value">-</div>
            <div class="data-title">粉丝</div>
          </div>
        </div>
      </div>
      <div v-else class="login-panel">
        <div class="basic-info">
          <div class="avatar cp" v-login>
            <img :src="userMomentInfo.avatar || '/static/images/avatar/default_avatar.png'" alt="默认头像"/>
          </div>
          <div class="basic-data">
            <div class="nickname cp" v-login>{{ userMomentInfo.nickname }}</div>
            <div class="signature">{{ userMomentInfo.signature }}</div>
          </div>
        </div>
        <div class="extra-info">
          <div class="data-item cp" @click="router.push('/moment/me')">
            <div class="data-value">{{ userMomentInfo.extraInfo?.momentCount }}</div>
            <div class="data-title">时刻</div>
          </div>
          <div class="data-item">
            <div class="data-value cp">{{ userMomentInfo.extraInfo?.likeCount }}</div>
            <div class="data-title">点赞</div>
          </div>
          <div class="data-item">
            <div class="data-value cp">{{ userMomentInfo.extraInfo?.fansCount }}</div>
            <div class="data-title">粉丝</div>
          </div>
        </div>
      </div>
    </div>
    <Announcement class="mt-8"/>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router"
import Announcement from "@/components/common/share/announcement/index.vue";

const {getters, dispatch} = useStore();
const router = useRouter();

const isLogin = computed(() => getters['isLogin']);
const userInfo = computed(() => getters['userInfo']);
const userMomentInfo = ref({});

const initData = () => {
  if (isLogin.value) {
    dispatch("getMomentUserDetail", {userId: userInfo.value.id}).then(res => {
      userMomentInfo.value = res.data;
    })
  }
}

initData();
</script>

<style scoped lang="scss">


.user-panel-moment {
  border-radius: 4px;
  width: 300px;

  .user-info {
    padding: 20px;
    background-color: var(--youyu-background1);
    border-radius: 4px;

    .basic-info {
      display: flex;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--youyu-border-color);

      .avatar {
        height: 48px;
        width: 48px;
        border-radius: 50%;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .basic-data {
        padding: 2px 10px;

        .nickname {
          font-size: 16px;
        }

        .signature {
          color: var(--youyu-body-text2);
          font-size: 12px;
        }
      }
    }

    .extra-info {
      padding-top: 16px;
      display: flex;

      > div {
        flex: 1;
        overflow: hidden;

        .data-value {
          font-size: 20px;
          margin-bottom: 2px;
          text-align: center;
        }

        .data-title {
          color: var(--youyu-body-text1);
          font-size: 14px;
          text-align: center;
        }
      }
    }

    .no-login-panel {
      .nickname {
        color: #1890ff;
      }
    }
  }
}
</style>
