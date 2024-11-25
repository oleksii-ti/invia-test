import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({ path: `.${process.env.TEST_ENV}.${process.env.LOCALE}.env` })

export default defineConfig({
  timeout: 1 * 60000,
  fullyParallel: true,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: `playwright-report-${process.env.LOCALE}` }]],
  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.199 Safari/537.36',
    locale: 'en-US',
    viewport: { width: 1920, height: 1080 },
    trace: 'retain-on-first-failure',
  },

  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
        isMobile: false
       },
    },
  ],
})
