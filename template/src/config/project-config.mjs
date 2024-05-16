import login from '@/login/index.vue'
import { getUserInfo } from '@/apis/index.js'
import customBar from '@/components/customBar.vue'

export default () => ({
  lifecycle: {
    beforeMount: (
      // app
    ) => {
      // 引入全局样式文件
      // import('@/assets/styles/global.less')
    },
    mounted: () => {
      // app.config.globalProperties.$router.addRoute({
      //   path: '/login',
      //   name: 'login',
      //   component: login,
      //   meta: {
      //     requiresAuth: false,
      //     permissions: [],
      //   },
      // })
    },
  },
  homePath: 'test2',
  userApiImplement: {
    getPermissionData: async () => {
      return {
        permissionCodes: ['admin'],
      }
    },
    login: async () => {
      localStorage.setItem('token', 'tokenstring')
      return 'tokenstring'
    },
    async logout() {
      // store.forEach(s => s?.$reset())
      // return loginOut({}).then((res) => {
      //   if (window._HZTJ_CHATGPT) {
      //     window._HZTJ_CHATGPT.remove()
      //   }
      //   return res
      // })
    },
    getUserInfo() {
      return getUserInfo().then((res) => {
        if (res?.data) {
          const { USERMESSAGE, PERMISSIONLIST } = res.data
          return {
            ...USERMESSAGE,
            permissionList: PERMISSIONLIST,
            name: `${USERMESSAGE?.userName}`,
          }
        }
      })
    },
  },
  pages: {
    login, // 传入自定义的登录组件
  },
  barConfig: {
    components: {
      customBar,
    },
  },
})
