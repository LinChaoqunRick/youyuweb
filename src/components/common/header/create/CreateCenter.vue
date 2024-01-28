<template>
  <a-dropdown-button
    type="primary"
    :trigger="['click']"
    class="create-center"
    :getPopupContainer="(triggerNode) => triggerNode.parentNode"
    overlayClassName="create-container"
  >
    创作中心
    <template #overlay>
      <div class="content-wrapper">
        <div class="menu-list">
          <div
            class="menu-item"
            :class="[`menu-item-${index}`]"
            v-for="(menu, index) in menuList"
            v-login="onNavigate(menu)"
          >
            <div class="menu-icon" v-html="menu.icon"></div>
            <div class="menu-title">{{ menu.title }}</div>
          </div>
        </div>
        <div class="todo-list" v-if="todoList?.length">
          <div class="todo-header">继续完成：</div>
          <div class="todo-items">
            <div
              class="todo-item"
              v-for="item in todoList"
              @click="onClickTodo"
            >
              <div class="item-type" :class="[`item-type-${item.type}`]">
                {{ item.typeName.slice(0, 1) }}
              </div>
              <div class="item-title text-limit" :title="item.title">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #icon>
      <i-down-one theme="filled" />
    </template>
  </a-dropdown-button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const { getters, commit, dispatch } = useStore();
const router = useRouter();

const isLogin = computed(() => getters["isLogin"]);
const userInfo = computed(() => getters["userInfo"]);

interface menuType {
  title: string;
  path: string;
  icon: string;
}

interface todoType {
  type: number;
  typeName: string;
  title: string;
  id: number | string;
}

const menuList = ref<menuType[]>([
  {
    title: "写博客",
    path: "/create/post",
    icon: '<svg t="1690335810333" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="31120" width="200" height="200"><path d="M764.16 927.0272H256a124.0576 124.0576 0 0 1-124.1088-124.0576V221.0304A124.0576 124.0576 0 0 1 256 96.9728h440.32l191.744 189.44v516.5568a124.1088 124.1088 0 0 1-123.904 124.0576z" fill="#1296db" p-id="31121" data-spm-anchor-id="a313x.7781069.0.i18" class=""></path><path d="M696.32 96.9728V248.32a41.8304 41.8304 0 0 0 41.8304 41.8304h149.9136v-3.7376z" fill="#85bcef" p-id="31122" data-spm-anchor-id="a313x.7781069.0.i19" class=""></path><path d="M666.7776 569.3952H332.8a40.96 40.96 0 0 1 0-81.92h334.08a40.96 40.96 0 0 1 0 81.92zM666.7776 787.0464H332.8a40.96 40.96 0 0 1 0-81.92h334.08a40.96 40.96 0 0 1 0 81.92zM522.24 351.744H332.8a40.96 40.96 0 0 1 0-81.92h189.44a40.96 40.96 0 0 1 0 81.92z" fill="#FFFFFF" p-id="31123"></path></svg>',
  },
  {
    title: "发时刻",
    path: "/moment",
    icon: '<svg t="1690351095046" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="31717" width="200" height="200"><path d="M492.8512 82.688C286.72 93.3376 118.9888 260.2496 107.4688 466.3808c-6.4512 115.0976 34.9696 220.5184 106.0864 298.2912 5.8368 6.4 9.2672 14.6944 9.2672 23.3472v111.7184c0 24.2688 24.6784 40.7552 47.104 31.488l113.664-47.1552c7.1168-2.9696 15.0016-3.2768 22.4768-1.2288a408.08448 408.08448 0 0 0 115.8144 14.5408c213.0944-3.84 389.632-174.8992 399.7184-387.7888 11.4176-241.408-187.1872-439.3472-428.7488-426.9056z m200.704 379.392h-40.7552l-17.1008 62.5664h17.7664c27.136 0 49.152 22.016 49.152 49.152s-22.016 49.152-49.152 49.152h-44.6464l-8.96 32.768a49.2032 49.2032 0 0 1-47.36 36.1984 49.664 49.664 0 0 1-13.0048-1.7408c-26.1632-7.168-41.5744-34.2016-34.4064-60.3648l1.8432-6.8096H450.1504l-8.96 32.768a49.2032 49.2032 0 0 1-47.36 36.1984 49.664 49.664 0 0 1-13.0048-1.7408c-26.1632-7.168-41.5744-34.2016-34.4064-60.3648l1.8432-6.8096h-12.9536c-27.136 0-49.152-22.016-49.152-49.152s22.016-49.152 49.152-49.152h39.8848l17.1008-62.5664h-16.896c-27.136 0-49.152-22.016-49.152-49.152s22.016-49.152 49.152-49.152h43.776L429.1072 327.68a49.11616 49.11616 0 0 1 60.3648-34.4064c26.1632 7.168 41.5744 34.2016 34.4064 60.3648l-2.816 10.2912h56.7808l9.9328-36.1984a49.11616 49.11616 0 0 1 60.3648-34.4064c26.1632 7.168 41.5744 34.2016 34.4064 60.3648l-2.816 10.2912h13.824c27.136 0 49.152 22.016 49.152 49.152 0 26.9312-22.016 48.9472-49.152 48.9472z" fill="#FF8E12" p-id="31718"></path><path d="M477.0304 524.5952h56.7808l17.152-62.5152h-56.832z" fill="#FCB138" p-id="31719"></path><path d="M492.8512 82.688C286.72 93.3376 118.9888 260.2496 107.4688 466.3808c-6.4512 115.0976 34.9696 220.5184 106.0864 298.2912 5.8368 6.4 9.2672 14.6944 9.2672 23.3472v28.2624c33.4336 6.8608 67.9936 10.496 103.4752 10.496 282.4192 0 511.3856-228.9664 511.3856-511.3856 0-28.1088-2.3552-55.6544-6.7072-82.4832-79.0016-97.1264-201.6768-157.2352-338.1248-150.2208z m200.704 379.392h-40.7552l-17.1008 62.5664h17.7664c27.136 0 49.152 22.016 49.152 49.152s-22.016 49.152-49.152 49.152h-44.6464l-8.96 32.768a49.2032 49.2032 0 0 1-47.36 36.1984 49.664 49.664 0 0 1-13.0048-1.7408c-26.1632-7.168-41.5744-34.2016-34.4064-60.3648l1.8432-6.8096H450.1504l-8.96 32.768a49.2032 49.2032 0 0 1-47.36 36.1984 49.664 49.664 0 0 1-13.0048-1.7408c-26.1632-7.168-41.5744-34.2016-34.4064-60.3648l1.8432-6.8096h-12.9536c-27.136 0-49.152-22.016-49.152-49.152s22.016-49.152 49.152-49.152h39.8848l17.1008-62.5664h-16.896c-27.136 0-49.152-22.016-49.152-49.152s22.016-49.152 49.152-49.152h43.776L429.1072 327.68a49.11616 49.11616 0 0 1 60.3648-34.4064c26.1632 7.168 41.5744 34.2016 34.4064 60.3648l-2.816 10.2912h56.7808l9.9328-36.1984a49.11616 49.11616 0 0 1 60.3648-34.4064c26.1632 7.168 41.5744 34.2016 34.4064 60.3648l-2.816 10.2912h13.824c27.136 0 49.152 22.016 49.152 49.152 0 26.9312-22.016 48.9472-49.152 48.9472z" fill="#FCA315" p-id="31720"></path><path d="M492.8512 82.688C286.72 93.3376 118.9888 260.2496 107.4688 466.3808c-3.5328 62.6176 7.2192 122.368 29.1328 176.3328a511.73376 511.73376 0 0 0 199.3728-19.8144h-0.6656c-27.136 0-49.152-22.016-49.152-49.152s22.016-49.152 49.152-49.152h39.8848l17.1008-62.5664h-16.896c-27.136 0-49.152-22.016-49.152-49.152s22.016-49.152 49.152-49.152h43.776l9.9328-36.1984a49.11616 49.11616 0 0 1 60.3648-34.4064c26.1632 7.168 41.5744 34.2016 34.4064 60.3648l-2.816 10.2912h56.7808l9.9328-36.1984a49.11616 49.11616 0 0 1 60.3648-34.4064c7.8848 2.1504 14.7456 6.144 20.3264 11.3152a510.85824 510.85824 0 0 0 29.2864-170.7008c0-2.7648-0.1536-5.4784-0.2048-8.192-61.0816-30.7712-130.8672-46.6944-204.6976-42.9056z" fill="#FCB138" p-id="31721"></path><path d="M492.8512 82.688c-204.5952 10.5472-371.2512 175.0528-385.024 379.0336 85.0432-8.2432 163.9936-37.4272 231.6288-82.176a49.80224 49.80224 0 0 1 17.3568-12.0832C451.2256 299.264 521.4208 199.68 552.0384 83.968c-19.3536-1.7408-39.1168-2.304-59.1872-1.28z" fill="#FFC65E" p-id="31722"></path></svg>',
  },
  {
    title: "写笔记",
    path: "/note/list",
    icon: '<svg t="1690340092926" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="31372" width="200" height="200"><path d="M176.4352 100.5568m101.9392 0l552.3968 0q101.9392 0 101.9392 101.9392l0 626.2272q0 101.9392-101.9392 101.9392l-552.3968 0q-101.9392 0-101.9392-101.9392l0-626.2272q0-101.9392 101.9392-101.9392Z" fill="#42B4FA" p-id="31373"></path><path d="M251.8016 343.3984H127.5904a51.2 51.2 0 0 1 0-102.4h124.2112a51.2 51.2 0 1 1 0 102.4zM251.8016 566.272H127.5904a51.2 51.2 0 0 1 0-102.4h124.2112a51.2 51.2 0 1 1 0 102.4zM251.8016 789.1456H127.5904a51.2 51.2 0 0 1 0-102.4h124.2112a51.2 51.2 0 1 1 0 102.4z" fill="#92DBFF" p-id="31374"></path><path d="M763.7504 354.56l-53.504-42.752a28.3648 28.3648 0 0 0-39.8336 3.9936L468.0704 558.08a29.0304 29.0304 0 0 0-6.0416 12.1856l-16.0768 71.68A28.9792 28.9792 0 0 0 455.68 670.72a28.6208 28.6208 0 0 0 24.32 5.9392 26.0608 26.0608 0 0 0 5.632-1.8944l74.0864-33.1776a28.5696 28.5696 0 0 0 10.24-7.8336L768 395.776a29.0816 29.0816 0 0 0-4.2496-40.96z" fill="#FFFFFF" p-id="31375"></path></svg>',
  },
  {
    title: "写期刊",
    path: "/magazine",
    icon: '<svg t="1690343188006" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4661" width="200" height="200"><path d="M663.5008 838.8096H197.4784c-53.0432 0-96.1024-43.008-96.1024-96.1024V159.3856c0-53.0432 43.008-96.1024 96.1024-96.1024h466.0224c53.0432 0 96.1024 43.008 96.1024 96.1024v583.3728c-0.0512 53.0432-43.0592 96.0512-96.1024 96.0512z" fill="#FFD05C" p-id="4662"></path><path d="M830.5664 970.0864H364.544c-53.0432 0-96.1024-43.008-96.1024-96.1024V290.6112C268.4416 237.568 311.4496 194.56 364.544 194.56h466.0224c53.0432 0 96.1024 43.008 96.1024 96.1024V873.984c0 53.0432-43.0592 96.1024-96.1024 96.1024z" fill="#FFD05C" p-id="4663"></path><path d="M365.8752 194.56c-53.8112 0-97.4336 43.6224-97.4336 97.4336v546.816h393.6768c53.8112 0 97.4336-43.6224 97.4336-97.4336V194.56H365.8752z" fill="#FCA235" p-id="4664"></path><path d="M692.9408 485.0688H430.4896c-22.6304 0-40.96-18.3296-40.96-40.96s18.3296-40.96 40.96-40.96h262.5024c22.6304 0 40.96 18.3296 40.96 40.96s-18.3808 40.96-41.0112 40.96zM578.6112 661.0432H430.4896c-22.6304 0-40.96-18.3296-40.96-40.96s18.3296-40.96 40.96-40.96h148.1216c22.6304 0 40.96 18.3296 40.96 40.96s-18.3296 40.96-40.96 40.96z" fill="#FFFFFF" p-id="4665"></path></svg>',
  },
  {
    title: "草稿箱",
    path: "/draft",
    icon: '<svg t="1690340131929" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4345" width="200" height="200"><path d="M864.4608 507.136h-225.1264c-3.1744 66.304-57.9072 119.0912-125.0304 119.0912S392.4992 573.44 389.3248 507.136H164.1984c-46.4896 0-84.224 37.6832-84.224 84.224v259.7888c0 46.4896 37.6832 84.224 84.224 84.224h700.2624c46.4896 0 84.224-37.6832 84.224-84.224V591.36c-0.0512-46.4896-37.7344-84.224-84.224-84.224z" fill="#FFAC3E" p-id="4346"></path><path d="M798.6688 842.5472H229.9904c-42.5984 0-77.1072-34.5088-77.1072-77.1072V170.6496c0-42.5984 34.5088-77.1072 77.1072-77.1072h568.6272c42.5984 0 77.1072 34.5088 77.1072 77.1072V765.44c0.0512 42.5984-34.4576 77.1072-77.056 77.1072z" fill="#FFAC3E" p-id="4347"></path><path d="M875.776 508.0064c-3.7376-0.512-7.4752-0.8704-11.3152-0.8704h-225.1264c-3.1744 66.304-57.9072 119.0912-125.0304 119.0912-67.072 0-121.8048-52.7872-125.0304-119.0912H164.1984c-3.84 0-7.6288 0.3584-11.3152 0.8704v257.4336c0 42.5984 34.5088 77.1072 77.1072 77.1072h568.6272c42.5984 0 77.1072-34.5088 77.1072-77.1072V508.0064z" fill="#FF7C0E" p-id="4348"></path><path d="M621.5168 297.7792H407.1424c-22.6304 0-40.96-18.3296-40.96-40.96s18.3296-40.96 40.96-40.96h214.3744c22.6304 0 40.96 18.3296 40.96 40.96s-18.3296 40.96-40.96 40.96zM621.5168 450.56H407.1424c-22.6304 0-40.96-18.3296-40.96-40.96s18.3296-40.96 40.96-40.96h214.3744c22.6304 0 40.96 18.3296 40.96 40.96s-18.3296 40.96-40.96 40.96z" fill="#FFFFFF" p-id="4349"></path></svg>',
  },
]);
const todoList = ref<todoType[]>([
  {
    type: 0,
    typeName: "文章",
    title: "最近未写完的文章最近未写完的文章",
    id: 255,
  },
  {
    type: 1,
    typeName: "笔记",
    title: "最近未写完的笔记最近未写完的笔记",
    id: 255,
  },
  {
    type: 2,
    typeName: "期刊",
    title: "最近未写完的期刊最近未写完的期刊",
    id: 255,
  },
]);

const getTodoList = () => {
  if (isLogin.value) {
    dispatch("getTodoList").then((res) => {
      todoList.value = res.data;
    });
  }
};

const onNavigate = (data: menuType) => {
  return () => {
    router.push(data.path);
  };
};

const onClickTodo = () => {
  console.log(arguments[0], arguments[1], arguments[2]);
};
</script>

<style lang="scss">
.create-center {
  .ant-dropdown-trigger {
    border-radius: 0 6px 6px 0 !important;
  }

  .create-container {
    background-color: var(--youyu-background1);
    padding: 12px;
    box-shadow: var(--youyu-shadow2);
    border-radius: 8px;
    border: 1px solid var(--youyu-border-color);

    .content-wrapper {
      .menu-list {
        display: flex;

        .menu-item {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          padding: 6px 13px;
          cursor: pointer;
          border-radius: 4px;

          &:hover {
            background-color: var(--youyu-background2);

            .menu-icon {
              svg {
                transform: translateY(-1px);
              }
            }
          }

          .menu-icon {
            font-size: 0;

            svg {
              height: 32px;
              width: 32px;
              margin-bottom: 4px;
              transition: 0.3s;
            }
          }

          .menu-title {
            font-size: 13px;
            color: var(--youyu-body-text2);
          }

          &.menu-item-0,
          &.menu-item-2 {
            .menu-icon {
              filter: drop-shadow(0 0 2px #1890ff);
            }
          }

          &.menu-item-1,
          &.menu-item-3,
          &.menu-item-4 {
            .menu-icon {
              filter: drop-shadow(0 0 2px #fca235);
            }
          }
        }
      }

      .todo-list {
        border-top: 1px solid var(--youyu-border-color);
        padding: 6px 0 0 2px;
        margin-top: 6px;

        .todo-header {
          font-size: 12px;
          color: var(--youyu-text1);
          padding-bottom: 6px;
        }

        .todo-items {
          .todo-item {
            display: flex;
            align-items: center;
            cursor: pointer;
            background-color: var(--youyu-background2);
            padding: 6px 2px 6px 8px;
            border-radius: 4px;
            overflow: hidden;

            &:nth-child(n + 2) {
              margin-top: 6px;
            }

            &:hover {
              background-color: var(--youyu-background3);

              .item-title {
                color: var(--youyu-body-text);
              }
            }

            .item-type {
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              height: 20px;
              width: 20px;
              font-size: 12px;
              margin-right: 4px;
              color: white;

              &.item-type-0 {
                background-color: #1890ff;
              }

              &.item-type-1 {
                background-color: #ce19ff;
              }

              &.item-type-2 {
                background-color: #ff630f;
              }
            }

            .item-title {
              flex: 1;
              font-size: 13px;
              color: var(--youyu-body-text2);
              transition: 0.3s;
            }
          }
        }
      }
    }
  }
}
</style>