import chalk from "chalk";
import inquirer from "inquirer";
let balance = Math.floor(Math.random() * 1000000);
console.log(balance, '===> see balance');
async function askForRestart() {
    const answerBoolean = await inquirer.prompt([
        {
            type: "list", choices: ["Yes", "No"], name: "yes_or_no", message: "Do you want to do more transactions?"
        },
    ]);
    if (answerBoolean.yes_or_no === "Yes") {
        takePromptsFromUser();
    }
    else {
        console.log(chalk.blue("Program Ended"));
    }
}
async function takePromptsFromUser() {
    const allQuestions = await inquirer.prompt([
        { type: "input", name: "id", message: "Enter your ID: " },
        { type: "input", name: "pin", message: "Enter your Pin: " },
        {
            type: "list", choices: ["Current", "Saving"], name: "type_of_account", message: "Your Account type?", when(allQuestions) {
                return allQuestions.id && allQuestions.pin;
            }
        },
        {
            type: "list", choices: ["Fast Cash", "Withdrawal", "Balance Inquiry"], name: "action_type", message: "Select Any Option", when(allQuestions) {
                return allQuestions.type_of_account;
            }
        },
        {
            type: "list", choices: [1000, 2000, 10000, 15000, 20000, 25000], name: "transaction_amount", message: "Select Amount", when(allQuestions) {
                return allQuestions.action_type === "Fast Cash";
            }
        },
        {
            type: "input", name: "transaction_amount", message: "Enter Amount: ", when(allQuestions) {
                return allQuestions.action_type === "Withdrawal";
            }
        }
    ]);
    if (allQuestions.id && allQuestions.pin) {
        if (allQuestions.action_type === "Balance Inquiry") {
            console.log(`Your account balance is ${balance}`);
        }
        else if (allQuestions.action_type === "Fast Cash" || allQuestions.action_type === "Withdrawal") {
            if (balance > allQuestions.transaction_amount) {
                let remainingAmount = balance - allQuestions.transaction_amount;
                console.log(`You withdraw ${allQuestions.transaction_amount} and your remaining amount is ${remainingAmount}`);
                balance = remainingAmount;
            }
            else {
                console.log("Insufficient Balance");
            }
        }
    }
    else {
        console.log("ATM functionalities locked");
    }
    askForRestart();
}
takePromptsFromUser();
