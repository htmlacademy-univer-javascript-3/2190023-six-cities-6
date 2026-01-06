import { test, expect, type Page, type Route } from '@playwright/test';

function mockCheckAuth(page: Page, status: 200 | 401) {
    return page.route('**/login', async (route: Route) => {
        const req = route.request();
        if (req.resourceType() === 'document') return route.continue();
        if (req.method() === 'GET') {
            if (status === 200) {
                return route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ ok: true }),
                });
            }
            return route.fulfill({ status: 401, contentType: 'application/json', body: '{}' });
        }
        return route.continue();
    });
}

function mockFavorites(page: Page) {
    return page.route('**/favorite*', async (route: Route) => {
        const req = route.request();
        if (req.resourceType() === 'document') return route.continue();
        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([]),
        });
    });
}

test.describe('LoginPage e2e', () => {
    test('login succeded: redirected to: "/"', async ({ page }) => {
        await mockCheckAuth(page, 401);
        await mockFavorites(page);

        await page.route('**/login', async (route) => {
            const req = route.request();
            if (req.resourceType() === 'document') return route.continue();
            if (req.method() === 'POST') {
                return route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ token: 'test-token' }),
                });
            }
            return route.continue();
        });
        await page.goto('/login');

        await page.getByLabel(/e-mail/i).fill('Oliver.conner@gmail.com');
        await page.getByLabel(/password/i).fill('password1');
        await page.getByRole('button', { name: /sign in/i }).click();

        await expect(page).toHaveURL(/\/$/);
    });

    test('login has failed: show error and stay on /login', async ({ page }) => {
        await mockCheckAuth(page, 401);
        await page.route('**/login', async (route) => {
            const req = route.request();
            if (req.resourceType() === 'document') return route.continue();
            if (req.method() === 'POST') {
                return route.fulfill({
                    status: 400,
                    contentType: 'application/json',
                    body: JSON.stringify({ message: 'Invalid email or password' }),
                });
            }
            return route.continue();
        });

        await page.goto('/login');

        await page.getByLabel(/e-mail/i).fill('user@test.com');
        await page.getByLabel(/password/i).fill('wrong');
        await page.getByRole('button', { name: /sign in/i }).click();

        await expect(page).toHaveURL(/\/login$/);
        await expect(page.getByText(/invalid email or password/i)).toBeVisible();
    });

    test('if already authorized: redirect from /login to "/"', async ({ page }) => {
        await mockCheckAuth(page, 200);
        await mockFavorites(page);

        await page.goto('/');
        await expect(page).toHaveURL(/\/$/);

        await page.goto('/login');
        await expect(page).toHaveURL(/\/$/);
    });
})