<template>
  <div class="win-op">
    <span
      v-if="showSetTop"
      :class="['iconfont icon-top no-drag top-icon', isTop ? 'win-top' : '']"
      :title="isTop ? '取消置顶' : '置顶'"
      @click="top"
    ></span>
    <span
      v-if="showMin"
      class="iconfont no-drag icon-min min-icon"
      title="最小化"
      @click="minimize_window"
    ></span>
    <span
      v-if="showMax"
      :class="['iconfont no-drag max-icon', isMax ? 'icon-maximize' : 'icon-max']"
      title="最大化"
      @click="maximize"
    ></span>
    <span
      v-if="showClose"
      class="iconfont no-drag icon-close close-icon"
      title="关闭"
      @click="close_window"
    ></span>
  </div>
</template>

<script setup>
// import { fa, tr } from 'element-plus/es/locales.mjs'
import { onMounted, ref } from 'vue'
// const close = () => {
//   window.ipcRenderer.send('closeWindow')
// }
// const minimize = () => {
//   window.ipcRenderer.send('minimizeWindow')
// }
const props = defineProps({
  showSetTop: {
    type: Boolean,
    default: true
  },
  showMin: {
    type: Boolean,
    default: true
  },
  showMax: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  // 关闭类型:0:关闭,1:隐藏
  closeType: {
    type: Number,
    default: 1
  }
})
const close_window = () => {
  winOp('close', { closeType: props.closeType })
}
const emit = defineEmits(['closeCallback'])
const isMax = ref(false)
const isTop = ref(false)
onMounted(() => {
  isMax.value = false
})
const winOp = (action, data) => {
  window.ipcRenderer.send('winTitleOp', [action, data])
}

const minimize_window = () => {
  window.ipcRenderer.send('minimizeWindow')
}
const maximize = () => {
  if (isMax.value) {
    winOp('unmaximize')
  } else {
    winOp('maximize')
  }
  isMax.value = !isMax.value
}
const top = () => {
  isTop.value = !isTop.value
  winOp('top', isTop.value)
}
</script>

<style scoped lang="scss">
.win-op {
  top: 0%;
  right: 0%;
  position: absolute;
  align-items: center;
  justify-content: center;
  display: flex;

  .iconfont {
    font-size: 12px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .close-icon {
    cursor: pointer;
    user-select: auto;
    height: 30px;
    width: 30px;
    border-radius: 0px 0px 0px 5px;
    &:hover {
      background-color: #d63223;
      color: white;
    }
  }
  .min-icon {
    cursor: pointer;
    user-select: auto;
    height: 30px;
    width: 30px;
    border-radius: 0px 0px 5px 5px;
    &:hover {
      background-color: #e9e9e9;
    }
  }
  .win-top {
    cursor: pointer;
    user-select: auto;
    height: 30px;
    width: 30px;
    border-radius: 0px 0px 5px 5px;
    background-color: transparent;
    color: #1a9ad1;
    &:hover {
      background-color: #e9e9e9;
    }
  }
  .max-icon {
    cursor: pointer;
    user-select: auto;
    height: 30px;
    width: 30px;
    border-radius: 0px 0px 5px 5px;
    &:hover {
      background-color: #e9e9e9;
    }
  }
  .top-icon {
    cursor: pointer;
    user-select: auto;
    height: 30px;
    width: 30px;
    border-radius: 0px 0px 5px 5px;
    &:hover {
      background-color: #e9e9e9;
    }
  }
}
</style>
