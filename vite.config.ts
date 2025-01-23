import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import pkg from './package.json'
import slugify from 'slugify'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import preload from 'vite-plugin-preload'
import { VitePWA } from 'vite-plugin-pwa'

const defaultNodeEnv = 'production'
process.env = {
  ...process.env,
  ...loadEnv(process.env.NODE_ENV || defaultNodeEnv, process.cwd()),
}
const isDev = process.env.NODE_ENV === 'development'
const PUBLIC_URL = process.env.VITE_PUBLIC_URL || ''
const GIT_SHA1 = process.env.VITE_GIT_SHA1
const BRAND_NAME = process.env.VITE_BRAND_NAME || '[NN]'

slugify.extend({ '/': '_' })

function* Counter(initValue = 0) {
  let count = initValue
  while (true) yield count++
}
const chuncksCounter = Counter(0)
const modulesToSeparate = [
  // 'axios',
  // 'retry-axios',
  // '@mui/material',
  // '@remix-run',
  'react-dom',
  'react-modal-sheet',
  // 'dayjs',
  // 'react-google-charts',
  // 'react-hook-form',
  'motion',
  'valtio',
  'framer-motion/dist/es/animation',
  'framer-motion/dist/es/gestures',
  'framer-motion/dist/es/motion',
  'framer-motion/dist/es/value',
  'framer-motion/dist/es/utils',
  'framer-motion/dist/es/render',
  'framer-motion/dist/es/projection',
]
const _chunksMap = new Map()

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    preload(),
    VitePWA({
      mode: isDev ? 'development' : 'production',
      srcDir: 'public/static/pwa/', // NOTE: Default 'public'
      outDir: 'dist',
      filename: 'sw.js',
      manifestFilename: 'site.webmanifest', // NOTE: Default 'manifest.webmanifest'
      strategies: 'generateSW',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      minify: false,
      manifest: {
        theme_color: "#ea580c",
        background_color: "#000",
        name: BRAND_NAME,
        short_name: BRAND_NAME,
        start_url: `${PUBLIC_URL}/#/sounds/?source=pwa&debug=1`,
        // scope: PUBLIC_URL,
        scope: "./",
        icons: [
          {
            src: `${PUBLIC_URL}/static/pwa/favicon.ico`,
            sizes: '32x32 16x16',
            type: 'image/x-icon',
          },
          {
            src: `${PUBLIC_URL}/static/pwa/android-chrome-192x192.png`,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: `${PUBLIC_URL}/static/pwa/icon512_maskable.png`,
            type: 'image/png',
          },
          {
            src: `${PUBLIC_URL}/static/pwa/android-chrome-512x512.png`,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        orientation: 'any',
        display: 'standalone',
        // display_override: ["fullscreen", "minimal-ui"],
        // dir: 'auto',
        lang: 'ru-RU',
      },
      useCredentials: true,
      includeManifestIcons: true,
      disable: false,
      devOptions: {
        enabled: true,
      },
    }),

    // NOTE: Last one
    // See also https://www.npmjs.com/package/rollup-plugin-visualizer
    // @ts-ignore
    visualizer({
      title: `Stats | WWW v${pkg.version} | GIT SHA1 ${GIT_SHA1}`,
      template: 'sunburst', // sunburst, treemap, network
      emitFile: true,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  build: {
    // NOTE: See also https://github.com/marcofugaro/browserslist-to-esbuild/blob/main/test/test.js
    target: browserslistToEsbuild(),
    outDir: 'dist',
    rollupOptions: {
      output: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        manualChunks(id: string, _manualChunkMeta) {
          for (const moduleSubstr of modulesToSeparate) {
            // NOTE: Reducing the vendor chunk size
            // See also https://dev.to/tassiofront/splitting-vendor-chunk-with-vite-and-loading-them-async-15o3
            if (id.includes(moduleSubstr)) {
              const normalizedModuleSubstr = slugify(moduleSubstr)
              const fromMap = _chunksMap.get(normalizedModuleSubstr)
              if (!fromMap) {
                const chunkName = `chunk.${
                  chuncksCounter.next().value
                }.${normalizedModuleSubstr}`
                _chunksMap.set(normalizedModuleSubstr, chunkName)
                return chunkName
              } else return _chunksMap.get(normalizedModuleSubstr)
            }
          }
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
