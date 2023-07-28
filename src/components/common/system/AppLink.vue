<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
      {{isActive}}
    </a>
  </router-link>
</template>

<script>
  import { RouterLink } from 'vue-router'

  export default {
    name: 'AppLink',
    inheritAttrs: false,

    props: {
      // 如果使用 TypeScript，请添加 @ts-ignore
      ...RouterLink.props,
      inactiveClass: String,
    },

    computed: {
      isExternalLink() {
        return typeof this.to === 'string' && this.to.startsWith('http')
      },
    },
  }
</script>
