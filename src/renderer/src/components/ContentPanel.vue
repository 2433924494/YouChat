<template>
  <div class="content-panel" :style="{ 'border-top': showTopBar ? '1px solid #ddd' : 'none' }">
    <div class="content-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showTopBar: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped lang="scss">
.content-panel {
  overflow: auto;
  height: calc(100vh - 62px);
  .content-inner {
    margin: 0px auto;
    width: 400px;
  }
}
</style>
