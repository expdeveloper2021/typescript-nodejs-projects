import inquirer from "inquirer";
async function askForMoreCounts() {
    let calculationsData = await inquirer.prompt([
        { type: "confirm", name: "ask_question_again", message: "Do you want to perform more operations?", default: false },
    ]);
    if (calculationsData.ask_question_again) {
        askQuestion();
    }
}
async function askQuestion() {
    let allQuestions = await inquirer.prompt([
        { type: "input", name: "paragraphByUser", message: `Please enter paragraph: ` },
        { type: "list", choices: ["Words", "Characters", "Both"], name: "whatToCount", message: "What do you want to count" },
    ]);
    console.log(allQuestions, '/see here');
    const { paragraphByUser, whatToCount } = allQuestions;
    if (paragraphByUser && whatToCount) {
        let allWords = paragraphByUser.split(" ");
        let allCharacters = paragraphByUser.split(" ").join("");
        if (whatToCount === "Words") {
            console.log(`There are ${allWords.length} words in this paragrah`);
        }
        else if (whatToCount === "Characters") {
            console.log(`There are ${allCharacters.length} characters in this paragrah`);
        }
        else {
            console.log(`There are ${allWords.length} words in this paragrah`);
            console.log(`There are ${allCharacters.length} characters in this paragrah`);
        }
    }
    else {
        console.log("Invalid Data");
    }
    askForMoreCounts();
}
askQuestion();
