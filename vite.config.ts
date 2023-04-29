import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { VitePWA } from 'vite-plugin-pwa'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		vue(),
		vuetify({ autoImport: true }),
		VitePWA({
			manifest: {
				"lang": "ja",
				"name": "BUYO v2",
				"short_name": "BUYO",
				"icons": [
					{
						"src": "/icons/android-chrome-192x192.png",
						"sizes": "192x192",
						"type": "image/png"
					},
				],
				"start_url": "/",
				"display": "standalone",
				"background_color": "#ffffff",
				"theme_color": "#ffffff",
				"orientation": "portrait-primary",
				"scope": "/",
			},
		}),
	],
})
