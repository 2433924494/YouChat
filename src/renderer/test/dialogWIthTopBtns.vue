<template>
  <div>
    <!-- 按钮，用于触发弹窗 -->
    <el-button type="primary" @click="openDialog">打开弹窗</el-button>

    <!-- 弹窗组件 -->
    <el-dialog
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      @before-close="handleBeforeClose"
      width="50%"
    >
      <!-- 自定义头部 -->
      <template #header>
        <div class="custom-dialog-header">
          <span class="custom-title">提示</span>
          <div class="custom-header-buttons">
            <i class="iconfont icon-hide" @click="hideDialog"></i>
            <i class="iconfont icon-maximize" @click="maximizeDialog"></i>
            <i class="iconfont icon-close" @click="closeDialog"></i>
          </div>
        </div>
      </template>

      <span>这是一个居中的弹窗，带有遮罩和动画效果。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDialog">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false, // 控制弹窗是否可见
      isMaximized: false // 控制弹窗是否最大化
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
    },
    hideDialog() {
      // 实现隐藏逻辑，这里是关闭弹窗
      this.closeDialog()
    },
    maximizeDialog() {
      this.isMaximized = !this.isMaximized
      if (this.isMaximized) {
        // 最大化弹窗
        this.$refs.dialog.$el.style.width = '100%'
        this.$refs.dialog.$el.style.height = '100%'
        this.$refs.dialog.$el.style.top = '0'
        this.$refs.dialog.$el.style.left = '0'
      } else {
        // 恢复原始大小
        this.$refs.dialog.$el.style.width = '50%'
        this.$refs.dialog.$el.style.height = 'auto'
        this.$refs.dialog.$el.style.top = ''
        this.$refs.dialog.$el.style.left = ''
      }
    },
    handleBeforeClose(done) {
      // 这里可以添加你自己的逻辑来决定是否允许关闭
      done() // 如果你希望关闭弹窗，就调用 done()
    }
  }
}
</script>

<style scoped>
/* 自定义头部样式 */
.custom-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

.custom-title {
  font-size: 16px;
  font-weight: bold;
}

.custom-header-buttons {
  display: flex;
  align-items: center;
}

.custom-header-buttons .iconfont {
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.3s;
}

.custom-header-buttons .iconfont:hover {
  color: #409eff; /* Element Plus 的主色调 */
}

/* 隐藏关闭按钮 */
.el-dialog__header .el-dialog__headerbtn {
  display: none;
}

/* 居中弹窗 */
.el-dialog {
  animation: fadeIn 0.3s ease; /* 自定义动画 */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
