import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({ path: `.${process.env.TEST_ENV}.${process.env.LOCALE}.env` })

export default defineConfig({
  timeout: 1 * 60000,
  fullyParallel: true,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }], ['junit', { outputFile: 'results.xml' }]],
  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'e2e',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
