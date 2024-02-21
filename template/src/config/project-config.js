export default ({ env }) => ({
  lifecycle: {
    beforeMount: (app) => {
      // 引入全局样式文件
      // import('@/assets/styles/global.less')
    },
    mounted: (app) => {
    },
  },
})
