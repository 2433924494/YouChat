<template>
  <div class="login-panel">
    <div class="title-drag drag">
      <span class="title banSelect">YouChat</span>
      <span class="iconfont icon-close close-icon no-drag" @click="close_window"></span>
    </div>
    <!-- <div v-if="shwoLoading" class="loading-panel">
      <img src="../assets/img/loading.gif" />
    </div> -->
    <div class="login-form">
      <el-form ref="formDataRef" :rules="rules" :model="form" label-width="0px" @submit.prevent>
        <el-form-item class="input-items" prop="email">
          <el-input
            v-model.trim="formData.email"
            size="large"
            clearable
            placeholder="请输入邮箱"
            @focus="cleanVerify"
          >
            <template #prefix>
              <span class="iconfont icon-email"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!isLogin" class="input-items" prop="nickName">
          <el-input
            v-model.trim="formData.nickName"
            size="large"
            clearable
            placeholder="请输入昵称"
            @focus="cleanVerify"
          >
            <template #prefix>
              <span class="iconfont icon-user"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="input-items" prop="password">
          <el-input
            v-model.trim="formData.password"
            size="large"
            show-password
            clearable
            placeholder="请输入密码"
            @focus="cleanVerify"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!isLogin" class="input-items" prop="rePassword">
          <el-input
            v-model.trim="formData.rePassword"
            size="large"
            show-password
            clearable
            placeholder="请再次输入密码"
            @focus="cleanVerify"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item class="input-items" prop="checkCode">
          <div class="check-code-panel">
            <el-input
              v-model.trim="formData.checkCode"
              size="large"
              clearable
              placeholder="请输入验证码"
              @focus="cleanVerify"
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img :src="checkCodeUrl" class="check-code" @click="changeCheckCode" />
          </div>
        </el-form-item>

        <div class="errorMsg banSelect">{{ errorMsg }}</div>
        <el-form-item label="">
          <div class="buttom-link">
            <span class="a-link banSelect" @click="changeOpType">{{
              isLogin ? '没有账号?' : '已有账号?'
            }}</span>
          </div>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" class="login-btn" @click="submit">
            {{ isLogin ? '登录' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
import md5 from 'js-md5'
import { useUserInfoStore } from '../stores/UserinfoStore'
import { useRouter } from 'vue-router'
const router = useRouter()
const userInfoStore = useUserInfoStore()
const { proxy } = getCurrentInstance()
const formData = ref({})
const formDataRef = ref()
const rules = {}
const errorMsg = ref(null)
const isLogin = ref(true)
const changeOpType = () => {
  isLogin.value = !isLogin.value
  window.ipcRenderer.send('loginOrRegister', isLogin.value)
  nextTick(() => {
    formDataRef.value.resetFields()
    formData.value = {}
    cleanVerify()
    changeCheckCode()
  })
}
const close_window = () => {
  window.ipcRenderer.send('closeWindow')
}
const shwoLoading = ref(false)
const submit = async () => {
  //清空提示词
  cleanVerify()
  if (!checkValue('checkEmail', formData.value.email, '请输入正确邮箱')) {
    return
  }
  if (!isLogin.value && !checkValue(null, formData.value.nickName, '请输入昵称')) {
    return
  }
  if (
    !isLogin.value &&
    !checkValue(
      'checkNickName',
      formData.value.nickName,
      '昵称只能是数字,字母和上下划线的组合(3~15位)'
    )
  ) {
    return
  }
  if (
    !checkValue(
      'checkPassword',
      formData.value.password,
      '密码应为数字,字母和特殊字符的组合(8位以上)'
    )
  ) {
    return
  }
  if (!isLogin.value && formData.value.password != formData.value.rePassword) {
    errorMsg.value = '两次密码不一致'
    return
  }
  if (!checkValue(null, formData.value.checkCode, '请输入验证码')) {
    return
  }
  shwoLoading.value = true
  let result = await proxy.Request({
    url: isLogin.value ? proxy.Api.login : proxy.Api.register,
    shwoError: false,
    shwoLoading: isLogin.value ? false : true,
    params: {
      email: formData.value.email,
      password: md5(formData.value.password),
      checkCode: formData.value.checkCode,
      nickName: formData.value.nickName,
      checkCodeKey: localStorage.getItem('checkCodeKey')
    },
    errorCallback: (response) => {
      shwoLoading.value = false
      changeCheckCode()
      errorMsg.value = response.info
      proxy.Message.error(response.info)
    }
  })

  if (!result) {
    return
  }
  if (isLogin.value) {
    userInfoStore.setInfo(result.data)
    localStorage.setItem('token', result.data.token)
    router.push('./main')
    const screen_width = window.screen.width
    const screen_height = window.screen.height
    window.ipcRenderer.send('openChat', {
      email: formData.value.email,
      token: result.data.token,
      userId: result.data.userId,
      nickName: result.data.nickName,
      admin: result.data.admin,
      screen_height: screen_height,
      screen_width: screen_width
    })
  } else {
    proxy.Message.success('注册成功')
    changeOpType()
  }
}

const checkValue = (type, value, msg) => {
  if (proxy.Utils.isEmpty(value)) {
    errorMsg.value = msg

    return false
  }
  if (type && !proxy.Verify[type](value)) {
    errorMsg.value = msg
    return false
  }
  return true
}
const checkCodeUrl = ref(null)
const changeCheckCode = async () => {
  let result = await proxy.Request({
    url: proxy.Api.checkCode
  })
  if (!result) {
    return
  }
  checkCodeUrl.value = result.data.checkCode
  localStorage.setItem('checkCodeKey', result.data.checkCodeKey)
}
changeCheckCode()
const cleanVerify = () => {
  errorMsg.value = null
}
</script>

<style lang="scss" scoped>
.login-panel {
  height: calc(100vh - 32px);
}

.title-drag {
  padding-top: 3%;
  margin-left: 5%;
  margin-right: 4%;
  // text-align: left;
  padding-bottom: 3%;
  position: relative;
  margin-bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .title {
    font-size: larger;
  }
  .close-icon {
    z-index: 999;
    cursor: pointer;
    user-select: auto;
  }
}

.input-items {
  margin: 6% 10%;
}

.login-btn {
  width: 60%;
  display: block;
  margin: 2% auto;
  margin-top: 4%;
  padding: 8 auto;
  font-size: medium;
}

.buttom-link {
  position: absolute;
  right: 0%;
  margin: 3% 10%;
}

.clearfix {
  overflow: auto;
}

.clearfix::after {
  content: '';
  clear: both;
  display: table;
}

.errorMsg {
  position: relative;
  margin-left: 10%;
  color: rgb(229, 43, 43);
  font-size: smaller;
  height: 10px;
  top: -14px;
}
.check-code-panel {
  display: flex;
  .check-code {
    cursor: pointer;
    width: 100px;
    margin-left: 5px;
    background-color: #f2f2f2;
    border-radius: 5px;
  }
}
.banSelect {
  user-select: none;
}
.loading-panel {
  height: calc(100vh - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
  }
}
</style>
