<template>
  <a-input ref="aInputRef">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </a-input>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const aInputRef = ref(null);

const inputProps = ref({})

onMounted(() => {
  for (const key in aInputRef.value) {
    inputProps.value[key] = aInputRef.value[key];
  }

  console.log(inputProps.value);
});

defineExpose({
  ...inputProps.value
});
</script>

