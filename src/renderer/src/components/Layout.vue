<template>
  <div class="layout-container">
    <div class="left-side-inner">
      <slot name="left"></slot>
    </div>
    <div class="right-content">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  .left-side-inner {
    width: 250px;
    background-color: #ffffff;
    border-color: #ddd;
    border-style: solid;
    border-width: 0px 1px 0px 0px;
  }
  .right-content {
    flex: 1;
    height: calc(100vh - 2px);
    background: #f2f2f2;
    width: 100%;
  }
}
</style>
