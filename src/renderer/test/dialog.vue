<template>
  <div>
    <!-- 按钮，用于触发弹窗 -->
    <el-button type="primary" @click="openDialog">打开弹窗</el-button>

    <!-- 弹窗组件 -->
    <!-- close-on-click-modal : 防止点击其他地方取消弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="提示"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="30%"
      @close="handleClose"
      @before-close="handleBeforeClose"
    >
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
      dialogVisible: false // 控制弹窗是否可见
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    handleClose() {
      // 关闭时执行的逻辑
      this.dialogVisible = false
    },
    confirmDialog() {
      // 点击确认按钮的逻辑
      this.dialogVisible = false
    },
    handleBeforeClose(done) {
      // 这里可以添加你自己的逻辑来决定是否允许关闭
      //   done() // 如果你希望关闭弹窗，就调用 done()
    }
  }
}
</script>

<style scoped>
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
