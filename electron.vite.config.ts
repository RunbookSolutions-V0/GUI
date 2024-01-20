import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: "electron/main/index.ts",
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      lib: {
        entry: "electron/preload/index.ts",
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    root: ".",
    build: {
      rollupOptions: {
        input: "index.html"
      }
    },
    // resolve: {
    //   alias: {
    //     '@renderer': resolve('src/main.ts')
    //   }
    // },
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})