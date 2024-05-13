<script setup>
import { onMounted, ref } from 'vue'

// import { useStore } from 'vuex'
import { closeToast, showToast } from 'vant'
import { useRouter } from 'vue-router'

// import { useUserStore } from '#/store'
import verification from '@/assets/images/verification.png'
import { getVerificationCode, loginIn } from '@/apis/index.js'

// import router from '@/router/index.js'
import { encrypt } from '@/utils/tools.js'

// const userStore = useUserStore()
// const appStore = useAppStore()
const router = useRouter()

// const store = useStore()

const imgUrl = ref(null)

const clickNumber = ref(0)

const pswType = ref(false)

const isRemember = ref(false)

const loginForm = ref({
  loginid: '',
  password: '',
  jcaptchaCode: '',
// ssoTag: 'abcdefg', // 跳过验证码验证
})

// async function initStore() {
//   const storeList = ['rules', 'userInfo', 'dict', 'menuInfo']
//   const isInited = await Promise.all(
//     storeList.map((item) => {
//       return store.dispatch(`${item}/init`)
//     }),
//   )
//   return isInited
// }

async function handleUserLogin() {
  showToast({
    message: '登录中...',
    duration: 0,
    forbidClick: true,
  })
  const { loginid, password, jcaptchaCode: code } = loginForm.value
  const params = {
    loginid: encrypt(loginid),
    password: encrypt(password),
    jcaptchaCode: code,
    loginType: undefined,
    smsCode: undefined,
  }
  const res = await loginIn(params).catch((error) => {
    if (error) {
      getCode()
    }
  })
  if (res?.token) {
    localStorage.token = res.token
    const { jcaptchaCode, ...rest } = loginForm.value
    // eslint-disable-next-line no-console
    console.log(jcaptchaCode)
    isRemember.value && localStorage.setItem('loginForm', JSON.stringify(rest))
    // await initStore()
    closeToast()
    router.push({
      name: 'test2',
    })
  }
}

async function getCode() {
  imgUrl.value = await getVerificationCode()
}

function autoLoginInfo() {
  const info = localStorage.getItem('loginForm')
  if (info) {
    loginForm.value = JSON.parse(info)
  }
}

onMounted(() => {
  autoLoginInfo()
  getCode()
})

function handleSwitch() {
  clickNumber.value += 1
  if (clickNumber.value > 7) {
    window.__axios.defaults.baseURL = 'http://10.13.5.47:8080'
    getCode()
    showToast('已切换为测试环境')
    window.checkAppVersion(false)
  }
}
</script>

<template>
  <div class="login">
    <img class="logo" src="@/assets/images/login-logo.png" alt="">
    <div class="title" @click="handleSwitch">
      全国火灾与警情统计系统
    </div>
    <div class="form">
      <van-form @submit="handleUserLogin">
        <van-field
          v-model="loginForm.loginid"
          left-icon="manager"
          name="loginid"
          placeholder="请输入用户名"
          maxlength="20"
          :required="true"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="loginForm.password"
          left-icon="lock"
          name="password"
          placeholder="请输入密码"
          maxlength="20"
          :type="pswType ? '' : 'password'"
          :required="true"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <template #button>
            <span @click="() => (pswType = !pswType)">
              <van-icon v-if="!pswType" name="closed-eye" />
              <van-icon v-else name="eye-o" />
            </span>
          </template>
        </van-field>
        <div class="validator">
          <van-field
            v-model="loginForm.jcaptchaCode"
            class="verification"
            :left-icon="verification"
            name="jcaptchaCode"
            placeholder="请输入验证码"
            maxlength="6"
            :required="true"
            :rules="[{ required: true, message: '请输入验证码' }]"
            type="number"
          />
          <div class="img" @click="getCode">
            <img :src="imgUrl" alt="">
          </div>
        </div>
        <div class="isRemember">
          <van-checkbox v-model="isRemember" shape="square">
            记住密码
          </van-checkbox>
        </div>
        <van-button
          class="submit"
          round
          block
          type="primary"
          native-type="submit"
        >
          登录
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.login {
  background: url('../assets/images/login-bg.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  overflow: hidden;
  background-color: #fff;

  .logo {
    height: 66px;
    width: 68px;
    margin: 50px auto 11px;
    display: block;
  }

  .title {
    width: 264px;
    height: 33px;
    font-size: 24px;
    font-family: STKaitiSC-Bold, STKaitiSC;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 33px;
    text-align: center;
    width: 100%;
  }
  .form {
    border-radius: 32px  32px  0px  0px;
    background: #fff;
    padding:46px 16px 0 16px;
    margin-top: 26px;
  }
  .isRemember{
    margin-top: 21px;
    font-size: 16px;
    ::v-deep(.van-checkbox__label){
      font-size: 14px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #545A66;
    }
  }
  ::v-deep .van-field{
    background-color: #F0F5F8 !important;
    margin-top: 16px;
  }
  .submit{
    margin-top: 65px;
    background-color: #7485CB !important;
    height: 36px;
  }
  .img{
    width: 105px;
    height: 40px;
    margin-top: 17px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .validator{
    display:flex;
    justify-content:space-between;
    align-items:center;
    .verification{
      margin-right:12px;

    }
  }
  .verification{
    ::v-deep(.van-field__left-icon){
      margin-top: 3px;
    }
  }
}
</style>
