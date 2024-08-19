import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// eslint-disable-next-line no-undef
const { GOOGLE_MAPS_API_KEY } = process.env

export default defineConfig({
    plugins: [
        react(),
        createHtmlPlugin({
            inject: {
                data: {
                    injectGoogleMapsScript: `<script async src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=Function.prototype"></script>`,
                },
            },
        }),
    ],
    resolve: {
        preserveSymlinks: true,
    },
})
