import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['src/modules/WebSdk/index.js']
  },
  build: {
    rollupOptions: {
      external: ['WebSdk'],
      output: {
        globals: {
          WebSdk: 'WebSdk'
        }
      }
    },
  },
  // resolve: {
  //   alias: {
  //     'WebSdk': './src/modules/WebSdk/index.js'
  //   }
  // }
})
