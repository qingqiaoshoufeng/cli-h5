export default {
  vite: ({ env }) => {
    return {}
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
