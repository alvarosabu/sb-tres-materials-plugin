import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import * as querystring from 'querystring'
import UnoCSS from 'unocss/vite'
import { templateCompilerOptions } from '@tresjs/core'
import { presetUno, presetAttributify, presetIcons, transformerDirectives } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions,
    }),
    cssInjectedByJsPlugin(),
    UnoCSS({
      theme: {
        colors: {
          primary: '#00B3B0',
          secondary: '#1B243F',
        },
      },
      presets: [presetUno(), presetAttributify(), presetIcons({
        scale: 1.2,
        warn: true,
        extraProperties: {
          display: 'inline-block',
          'vertical-align': 'middle',
          // ...
        },
      })],
      transformers: [transformerDirectives()],
    }),
    printProd(),
    printDev(),
  ],
  build: {
    rollupOptions: {
      output: {
        format: 'commonjs',
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
  server: {
    port: 8080,
    host: true,
  },
})

const sandboxBaseUrl = `https://plugin-sandbox.storyblok.com/field-plugin`
const sandboxUrl = (fieldPluginUrl: string) => {
  const urlQuery = querystring.stringify({
    url: fieldPluginUrl,
  })
  return `${sandboxBaseUrl}?${urlQuery}`
}

const styles = {
  reset: '\u001b[0m',
  green: '\u001b[32m',
  bold: '\u001b[1m',
}

// Utility functions for printing to terminal

const green = (text: string) => `${styles.green}${text}${styles.reset}`
const bold = (text: string) => `${styles.bold}${text}${styles.reset}`

const arrow = green('➜')

function printProd(): PluginOption {
  return {
    name: 'storyblok-field-plugin-print-prod',
    // https://vitejs.dev/guide/api-plugin.html#plugin-ordering
    enforce: 'post',
    writeBundle: () => {
      console.log(` 
  Deploy the plugin to production with:
  
    ${green('yarn deploy')}
      `)
    },
  }
}

function printDev(): PluginOption {
  return {
    name: 'storyblok-field-plugin-print-dev',
    // https://vitejs.dev/guide/api-plugin.html#plugin-ordering
    enforce: 'post',
    // https://vitejs.dev/guide/api-plugin.html#conditional-application
    apply: 'serve',
    configureServer(server) {
      // Overrides the message that Vite prints out when the server is started. To reduce complexity, it does not include color
      server.printUrls = () => {
        const localUrl = server.resolvedUrls!.local[0]
        const networkUrl = server.resolvedUrls!.network[0]

        console.log(`
    ${arrow}  ${bold(
          'Partner Portal',
        )}:  https://app.storyblok.com/#/partner/fields
    ${arrow}  ${bold('My plugins')}:      https://app.storyblok.com/#/me/plugins
     
    ${arrow}  ${bold('Local')}:    ${localUrl}
    ${arrow}  ${bold('Network')}:  ${networkUrl}
        
  See the plugin in action on 
     
    ${arrow}  ${bold('Sandbox')}: ${sandboxUrl(localUrl)}
          `)
      }
    },
  }
}
