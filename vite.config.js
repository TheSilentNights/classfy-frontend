import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  dev:{
    hotUpdate:true,
  },
  server:{
    host:'0.0.0.0',
    port:'2345',
    https:false,
  }
})
