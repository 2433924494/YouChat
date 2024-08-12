const regs = {
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
  password:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]])[A-Za-z\d`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]]{8,}$/,
  version: /^[0-9\.]+$/,
  number: /^\+?[1-9][0-9]*$/,
  nickName: /^[a-zA-Z0-9_-]{3,15}$/
}

const verify = (rule, value, reg, callback) => {
  if (value) {
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error(rule.message))
    }
  } else {
    callback()
  }
}

const checkPassword = (value) => {
  return regs.password.test(value)
}
const checkEmail = (value) => {
  return regs.email.test(value)
}
const checkNickName = (value) => {
  return regs.nickName.test(value)
}
const password = (rule, value, callback) => {
  return verify(rule, value, regs.password, callback)
}
const number = (rule, value, callback) => {
  return verify(rule, value, regs.number, callback)
}

export default {
  checkPassword,
  checkEmail,
  password,
  number,
  checkNickName
}
