<template>
  <div class="search" :class="{'unfold': active}">
    <div class="search-stuff" @click="onOpen">
      <div class="placeholder">输入搜索关键词</div>
      <i-search theme="outline" size="20" fill="currentColor" :strokeWidth="3"/>
    </div>
    <div class="search-container" v-show="active" v-on-click-outside="onClose">
      <div class="search-header">
        <div class="search-menu">
          <span v-for="(item, index) in menus" class="menu-item"
                :class="{'menu-item-active':index===activeIndex}"
                @click="onMenuChange(index)">
            {{ item }}
          </span>
        </div>
        <div class="search-close">
          <i-close theme="outline" size="20" fill="#fff" @click="onClose"/>
        </div>
      </div>
      <div class="search-content">
        <div class="search-content-input">
          <i-search theme="outline" size="20" fill="currentColor" :strokeWidth="3"/>
          <div class="input-wrapper">
            <a-input
              v-model:value="text"
              placeholder="输入搜索关键词"
              enter-button
              :maxlength="50"
              @pressEnter="handleSearch"
            />
          </div>
          <a-button type="link" @click="handleSearch">搜索</a-button>
        </div>
        <div class="search-content-items">
          <div class="search-content-item">
            <div class="item-label">
              <span>历史搜索</span>
              <i-delete theme="outline" size="13" fill="currentColor" @click="onClearHistory"/>
            </div>
            <div v-if="searchHistory.length" class="history-item">
              <a-tag v-for="item in searchHistory" closable @click="onTagClick(item)" @close="onItemDelete(item)">
                {{ item }}
              </a-tag>
            </div>
            <div v-else class="no-data">暂无记录</div>
          </div>
          <div class="search-content-item">
            <div class="item-label">
              <span>搜索发现</span>
            </div>
            <div v-if="false">
              <a-tag v-for="item in searchHistory">{{ item }}</a-tag>
            </div>
            <div v-else class="no-data">暂无记录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {vOnClickOutside} from '@vueuse/components'

const route = useRoute();
const router = useRouter();
const {getters, commit} = useStore();

const text = ref("");
const active = ref(false);
const menus = ['全部', '用户'];
const activeIndex = ref(0);
const searchHistory = computed(() => getters['getSearchHistory']);

const handleSearch = () => {
  if (text.value) {
    const type = activeIndex.value;
    router.push(`/search?q=${text.value}&type=${type}`);
    commit('addHistory', text.value);
    active.value = false;
  }
}

const onTagClick = (data) => {
  text.value = data;
  handleSearch();
}

const onOpen = () => {
  active.value = true;
}

const onClose = () => {
  active.value = false;
}

const onMenuChange = (index) => {
  activeIndex.value = index;
}

const onItemDelete = (text) => {
  commit('deleteHistory', text);
}

const onClearHistory = () => {
  commit('clearHistory');
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  height: 100%;
  border-style: solid;
  border-width: 0 1px 0 1px;
  border-color: var(--youyu-border-color3);

  .search-stuff {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 176px;
    height: 100%;
    padding: 0 16px;
    cursor: pointer;
    transition: .3s;
    position: relative;

    .placeholder {
      color: #bdbdbd;
    }

    .i-icon {
      color: #181818;
      transition: .3s;
    }

    &:hover {
      .i-icon {
        color: #1890ff;
      }
    }
  }

  .search-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    transition: .3s;
    box-shadow: var(--youyu-shadow1);

    .search-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 60px;
      padding: 0 20px;
      background: linear-gradient(270deg, #30b6ec, #0692ef 95%);

      .search-menu {
        height: 100%;

        .menu-item {
          position: relative;
          display: inline-block;
          line-height: 60px;
          margin-right: 22px;
          color: #fff;
          opacity: .6;
          cursor: pointer;
          transition: .3s;

          &.menu-item-active {
            opacity: 1;

            &:after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 8px;
              width: 0;
              height: 0;
              border: 6px solid transparent;
              border-bottom: 6px solid #fff;
            }
          }
        }
      }

      .search-close {
        .i-icon {
          cursor: pointer;
        }
      }
    }

    .search-content {
      background-color: var(--youyu-background1);

      .search-content-input {
        display: flex;
        align-items: center;
        height: 60px;
        margin: 0 20px;
        border-bottom: 1px solid #1890ff;

        .i-icon {
          padding-right: 10px;
        }

        .input-wrapper {
          flex: 1;

          input {
            border: none;
            outline: none;
            box-shadow: none;
            padding: 0;
          }
        }
      }

      .search-content-items {
        padding: 12px 20px 4px 20px;

        .search-content-item {
          padding-bottom: 12px;

          .item-label {
            display: flex;
            align-items: center;
            font-size: 13px;
            padding-bottom: 8px;

            .i-icon {
              margin-left: 3px;
              cursor: pointer;
            }
          }

          .history-item {
            cursor: pointer;

            ::v-deep(.ant-tag) {
              transition: .3s;

              &:hover {
                border-color: #1890ff;
              }
            }
          }

          .no-data {
            padding: 0;
          }
        }
      }
    }
  }
}

.unfold {
  .search-container {
    animation-name: searchOpen;
    animation-iteration-count: 1;
    animation-duration: .2s;
    animation-delay: 0s;
    animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-fill-mode: both;
  }
}

@keyframes searchOpen {
  0% {
    opacity: 0;
    z-index: -1;
    width: 0;
  }
  100% {
    opacity: 1;
    z-index: 99;
    width: 624px;
  }
}
</style>
