import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import autoprefixer from 'autoprefixer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { compression } from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    compression({
      threshold: 1000,
      deleteOriginalAssets: false,
      skipIfLargerOrEqual:true
    }),
    visualizer()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'./src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://yukioo.xyz',
        changeOrigin: true
      },
    }
  },
  css:{
    postcss:{
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'not ie <= 11',
            'last 2 version'
          ],
          grid: true
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  build: {
    outDir: 'YukiooWeb',
    cssCodeSplit: true,
    rollupOptions: {
      input:  'index.html',
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
