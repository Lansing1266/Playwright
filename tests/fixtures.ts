import { test as baseTest } from '@playwright/test';
import { TodoPage } from '../page-objects/todoPage';

type Fixtures = {
  todoPage: TodoPage;
};

export const test = baseTest.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/')
    const todoPage = new TodoPage(page);
    await use(todoPage);
  },
}); 
//test

export { expect } from '@playwright/test';