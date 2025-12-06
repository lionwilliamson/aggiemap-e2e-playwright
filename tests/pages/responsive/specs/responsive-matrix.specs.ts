import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'desktop-lg', width: 1280, height: 720 },
  { name: 'desktop-sm', width: 1024, height: 720 },
  { name: 'tablet',     width: 768,  height: 900 },
  { name: 'phone',      width: 430,  height: 900 },
];

test.describe('Responsive Matrix', () => {
  for (const vp of VIEWPORTS) {
    test(`renders map UI at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('http://localhost:4200/map/d');

      // 1) map must exist
      await expect(page.locator('tamu-gisc-esri-map')).toBeVisible();

      // 2) try several possible sidebar/menu controls
      const candidates = [
        page.getByRole('button', { name: /toggle features/i }),
        page.getByRole('button', { name: /layers/i }),
        page.getByRole('button', { name: /menu/i }),

        // icon-based 
        page.locator('i.material-icons:has-text("menu")').first(),

        // fall back to the sidebar container itself
        page.locator('tamu-gisc-aggiemap-sidebar'),
      ];

      let found = false;
      for (const c of candidates) {
        if (await c.isVisible().catch(() => false)) {
          found = true;
          break;
        }
      }

      await expect(found, `No sidebar/menu control visible at ${vp.name}`).toBeTruthy();
    });
  }
});
