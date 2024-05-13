import axios from 'axios'

// 登录接口
export function loginIn(data) {
  return axios.post('/acws/rest/authentication', data, {
    noErrorHandler: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  }).then((res) => {
    return res.data
  })
}

export async function getVerificationCode() {
  // eslint-disable-next-line n/prefer-global/process
  const imgRes = await fetch(`${['production', 'test'].includes(process.env.NODE_ENV) ? process.env.VUE_APP_BASE_URL : ''}/acws/rest/security/captcha`).then(r => r.blob()).then((blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        resolve(reader.result)
      }
    })
  })
  return Promise.resolve(imgRes)
}

// 获取用户信息
export function getUserInfo() {
  return axios.get('acws/rest/biz/sys/currentusers', { noErrorHandler: true })
}
