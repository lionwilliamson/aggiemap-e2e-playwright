import { Page, Locator } from '@playwright/test';

export class SidebarMainPage {
  readonly page: Page;
  readonly sidebarToggle: Locator;
  readonly sidebarPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    // these test IDs are based on the prefix given: am-sidebar-main-...
    this.sidebarToggle = page.getByTestId('am-sidebar-main-toggle');
    this.sidebarPanel = page.getByTestId('am-sidebar-main-panel');
  }

  async goto() {
    // your app
    await this.page.goto('http://localhost:4200/map/d');
  }

  async openSidebar() {
    await this.sidebarToggle.click();
  }
}
