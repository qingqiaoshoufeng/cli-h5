// import { visualizer } from 'rollup-plugin-visualizer'

export default {
  vite: ({ env }) => {
    return {
      build: {
        rollupOptions: {
          // 如有需要测试，请自行开启
          // plugins: [visualizer({ gzipSize: false, open: true })],
        },
      },
    }
  },
  server: ({ env }) => {
    return {
      host: true,
      open: true,
      port: 3000,
      proxy: {
        '/acws': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    }
  },
}
