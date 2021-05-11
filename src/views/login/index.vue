<template>
  <div class="login-container">
    <el-form
      ref="loginForm_Dom"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          都来云智慧物流
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username_dom"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password_dom"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span
            class="show-pwd"
            @click="showPwd"
          >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >
        登 录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive, onMounted, nextTick, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { validUsername } from '@/utils/validate'

/**
 * 登录
 * @param loginForm
 * @param redirect
 * @param otherQuery
 * @returns {{redirect: *, loginForm_Dom: *, handleLogin: (function(): Promise<undefined>), otherQuery: *, loading: *}}
 */
const useLoginFormEffect = (loginForm, redirect, otherQuery) => {
  const router = useRouter()
  const loading = ref(false)
  const loginForm_Dom = ref(null)
  const store = useStore()
  const handleLogin = async() => {
    const form = loginForm_Dom.value
    if (!form) return
    try {
      await form.validate()
      loading.value = true
      store.dispatch('user/login', loginForm)
        .then(() => {
          router.push({ path: redirect || '/', query: otherQuery })
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    } catch (error) {
    }
  }
  return {
    loading,
    handleLogin,
    redirect,
    otherQuery,
    loginForm_Dom
  }
}
/**
 * 用户名密码校验
 * @returns {{loginRules: {password: [{validator: function(*, *, *): void, trigger: string, required: boolean}], username: [{validator: function(*, *=, *): void, trigger: string, required: boolean}]}}}
 */
const useLoginRulesEffect = () => {
  const validateUsername = (rule, value, callback) => {
    if (!validUsername(value)) {
      callback(new Error('Please enter the correct user name'))
    } else {
      callback()
    }
  }
  const validatePassword = (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'))
    } else {
      callback()
    }
  }
  const loginRules = {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
  }

  return {
    loginRules
  }
}
/**
 * 监听路由变化,再次登录直接进入退出的页面
 * @param redirect
 * @param otherQuery
 */
const useWatchEffect = (redirect, otherQuery) => {
  const route = useRoute()
  const getOtherQuery = (query) => {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {})
  }
  watchEffect(() => {
    const query = route.query
    if (query) {
      redirect = query.redirect
      otherQuery = getOtherQuery(query)
    }
  })
}
/**
 * 页面加载光标聚焦
 * @param username
 * @param password
 * @param loginForm
 */
const useOnMountedEffect = (username, password, loginForm) => {
  onMounted(() => {
    if (loginForm.username === '') {
      username.value.focus()
    } else if (loginForm.password === '') {
      password.value.focus()
    }
  })
}
/**
 * 密码显示
 * @param password
 * @returns {{showPwd: showPwd, passwordType: *}}
 */
const useShowPwdEffect = (password) => {
  const passwordType = ref('password')
  const showPwd = () => {
    if (passwordType.value === 'password') {
      passwordType.value = ''
    } else {
      passwordType.value = 'password'
    }
    nextTick(() => {
      password.value.focus()
    })
  }
  return {
    passwordType,
    showPwd
  }
}
const useCheckCapslockEffect = () => {
  const capsTooltip = ref(false)
  const checkCapslock = (e) => {
    const { key } = e
    capsTooltip.value = key && key.length === 1 && (key >= 'A' && key <= 'Z')
  }
  return {
    capsTooltip,
    checkCapslock
  }
}
export default {
  name: 'Login',
  setup() {
    const redirect = ''
    const otherQuery = {}
    const username_dom = ref(null)
    const password_dom = ref(null)
    const loginForm = reactive({
      username: 'admin',
      password: '111111'
    })
    const { loading, handleLogin, loginForm_Dom } = useLoginFormEffect(loginForm, redirect, otherQuery)
    const { loginRules } = useLoginRulesEffect()
    useWatchEffect(redirect, otherQuery)
    useOnMountedEffect(username_dom, password_dom, loginForm)
    const { passwordType, showPwd } = useShowPwdEffect(password_dom)
    const { capsTooltip, checkCapslock } = useCheckCapslockEffect(password_dom)
    return {
      username_dom,
      password_dom,
      loginForm_Dom,
      loginForm,
      loginRules,
      passwordType,
      capsTooltip,
      loading,
      handleLogin,
      checkCapslock,
      showPwd
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-plus css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
