import {Page} from '@playwright/test'

export class TodoPage {

    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }
    
    firstItem() {
        return this.page.locator('.todo-list li').first();
    }

    allItems (){
        return this.page.locator('.todo-list li');
    }

    todoTextStyle () {
        return this. firstItem().locator('.view label')
    }

    itemCount () {
        return this.page.locator('[data-testid="todo-count"]');
    }

    async addTodos (todoItems: string[]){
        const inputField  =  await this.page.getByPlaceholder('What needs to be done?');
        for (const todo of todoItems) {
            await inputField.fill(todo);
            await inputField.press('Enter');
        }
    }

    async toggleTodoComplete (completed: boolean){
        const checkbox = this.firstItem().locator('input[type="checkbox"]');
        if (completed) {
            await checkbox.check();
        }
        else {
            await checkbox.uncheck()
        }
    }

    async deleteToDoItem (todoItem: string[]) {
        for (const itemText of todoItem) {
            const item = this.page.locator('[data-testid="todo-title"]', {hasText: itemText}).locator('..')
            await item.hover()
            const deleteItem = item.locator('.destroy')
            await deleteItem.click()
        }
    }
      
}

