import { test, expect } from '@playwright/test';

const APP_URL = 'http://localhost:4200/map/d';
const TOGGLE_NAME = /Toggle Features \(Search, Layers, Legend\)/i;

test.describe('Sidebar.Main', () => {
  test('can open the sidebar and the content is present', async ({ page }) => {
    await page.goto(APP_URL);

    // page is loaded
    await expect(page.getByRole('heading', { name: /Aggiemap Beta/i })).toBeVisible();

    const toggleButton = page.getByRole('button', { name: TOGGLE_NAME });

    // open it
    await toggleButton.click({ force: true });

    // sidebar content shows up
    const layersText = page.getByText(/layers/i);
    await expect(layersText).toBeVisible();

    // click again just to make sure the button is still usable
    await toggleButton.click({ force: true });

    // don’t require it to disappear, UI keeps it around
    await expect(layersText).toBeVisible();
  });
});
