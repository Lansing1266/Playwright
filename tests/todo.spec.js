import { test, expect } from './fixtures';

test.describe('ToDo page', () => {
    test('add single todo', async({todoPage})=>{
        await todoPage.addTodos(['Clean floors'])
        await expect(todoPage.allItems()).toHaveCount(1)
        await expect(todoPage.firstItem()).toHaveText('Clean floors')
    })

    test('add multiple todos', async({todoPage})=>{
        const toDoList = ['Clean floors', 'Buy TV',  'Walk a dog', 'Repaint walls'];
    
        await todoPage.addTodos(toDoList)
        const allList = await todoPage.allItems().allTextContents();
        await expect(todoPage.allItems()).toHaveCount(toDoList.length);
        expect(allList).toEqual(toDoList);
    })

    test('mark todo as completed', async({todoPage})=>{
        await todoPage.addTodos(['Clean floors'])
        await todoPage.toggleTodoComplete(true)
       
        await expect(todoPage.firstItem()).toHaveClass('completed')
        await expect(todoPage.todoTextStyle()).toHaveCSS('text-decoration', /line-through/)
    })

    test('unmark completed todo', async({todoPage})=>{
        await todoPage.addTodos(['Clean floors'])
        await todoPage.toggleTodoComplete(true)
        await todoPage.toggleTodoComplete(false)
       
        await expect(todoPage.firstItem()).not.toHaveClass('completed');
        await expect(todoPage.itemCount()).toHaveText('1 item left');
    })

    test('delete todo', async({todoPage})=>{
        await todoPage.addTodos(['Clean floors'])
        await todoPage.deleteToDoItem(['Clean floors'])

        await expect(todoPage.firstItem()).toBeHidden()
        await expect(todoPage.allItems()).toHaveCount(0)
    })
})