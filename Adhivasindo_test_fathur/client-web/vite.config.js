import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      autoInstall: true,
    }),
    TanStackRouterVite({ autoCodeSplitting: true, target: 'react' }),
    viteReact(),
    tailwindcss(),
  ],
})
