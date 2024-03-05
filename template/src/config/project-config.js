export default (
  // {
  //   env,
  // },
) => ({
  lifecycle: {
    beforeMount: (
      // app
    ) => {
      // 引入全局样式文件
      // import('@/assets/styles/global.less')
    },
    mounted: (
      // app
    ) => {
    },
  },
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
  },
})
