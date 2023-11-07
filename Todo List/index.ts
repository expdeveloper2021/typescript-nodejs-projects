import inquirer from "inquirer";
import chalk from "chalk"

function renderToDoList(): void {
    console.log(chalk.blue("Here is your todo List"))
    todoList.map((item, index) => console.log(chalk.blue(`${index + 1}: ${item.itemName.split("")[0].toUpperCase() + item.itemName.slice(1)}`)))
}

interface objectTodo {
    itemName: string,
}

let todoList: objectTodo[] = [];
let isLoop = true;

function addItemInTodo(itemName: string) {
    let obj: objectTodo = {
        itemName,
    }

    todoList.push(obj)
}

while (isLoop) {
    let allQuestions: {
        todo_item: string,
        addmoretodos: boolean,
    } = await inquirer.prompt([
        { type: "input", name: "todo_item", message: `Enter your No. ${todoList.length + 1} Todo Item:` },
        { type: "confirm", name: "addmoretodos", message: "Do you want to add more items in list?", default: false },
    ])

    addItemInTodo(allQuestions.todo_item)

    if (!allQuestions.addmoretodos) {
        isLoop = false
    }
}

renderToDoList()

async function performMoreFunctions() {
    let actionsQuestion: {
        action_confirmation: boolean,
        action_type: string,
        index_action: number,
        edit_text: string,
        add_text: string,
    } = await inquirer.prompt([
        { type: "confirm", name: "action_confirmation", message: "Do you want to perform actions like add/edit/delete?", default: false },
        {
            type: "list", choices: ["Add", "Edit", "Delete"], name: "action_type", message: "Enter your Todo Item:", when(actionsQuestion) {
                return actionsQuestion.action_confirmation
            },
        },
        {
            type: "number", name: "index_action", message: "Enter Item Number You want to Peform action:", when(actionsQuestion) {
                return actionsQuestion.action_type === "Delete" || actionsQuestion.action_type === "Edit"
            },
        },
        {
            type: "input", name: "edit_text", message: "Enter The Text You Want To Replace:", when(actionsQuestion) {
                return actionsQuestion.action_type === "Edit"
            },
        },
        {
            type: "input", name: "add_text", message: "Enter Your Todo Item:", when(actionsQuestion) {
                return actionsQuestion.action_type === "Add"
            },
        },
    ])

    if (actionsQuestion.action_confirmation) {
        if (actionsQuestion.action_type === "Delete" && actionsQuestion.index_action) {
            todoList.splice(actionsQuestion.index_action - 1, 1)
        } else if (actionsQuestion.action_type === "Edit" && actionsQuestion.edit_text) {
            if (actionsQuestion.index_action - 1 >= 0 && actionsQuestion.index_action - 1 < todoList.length) {
                todoList[actionsQuestion.index_action - 1].itemName = actionsQuestion.edit_text
            }
        } else if (actionsQuestion.action_type === "Add" && actionsQuestion.add_text) {
            addItemInTodo(actionsQuestion.add_text)
        }
        renderToDoList()
        performMoreFunctions()
    }
}

performMoreFunctions()