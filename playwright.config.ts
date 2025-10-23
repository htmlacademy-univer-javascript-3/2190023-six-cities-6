import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: 'src/tests',
    testMatch: /.*\.e2e.ts$/,
    timeout: 30_000,
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
        headless: true,
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: true,
        timeout: 120_000,
    },
});