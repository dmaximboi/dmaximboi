import baseConfig from '@dmaximboi/config-tailwind/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Config = {
  ...baseConfig,
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
}

export default config
