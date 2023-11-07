import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bgRed.blue('Welcome to the Number Guess Game'));
let difficultyType = await inquirer.prompt([{
        name: "levelUser",
        type: "list",
        choices: ["Basic", "Advanced", "Pro"],
        message: "Which level do you want to play?"
    }]);
function generateRandomNumbersArray(x) {
    let randomArray = new Set();
    while (randomArray.size < x) {
        let randomNumber = Math.floor(Math.random() * 20) + 1;
        randomArray.add(randomNumber);
    }
    return Array.from(randomArray);
}
let amountOfQuestions = [];
if (difficultyType.levelUser === "Basic") {
    let questionsToGenerate = 2;
    amountOfQuestions = generateRandomNumbersArray(questionsToGenerate);
}
else if (difficultyType.levelUser === "Advanced") {
    let questionsToGenerate = 4;
    amountOfQuestions = generateRandomNumbersArray(questionsToGenerate);
}
else if (difficultyType.levelUser === "Pro") {
    let questionsToGenerate = 6;
    amountOfQuestions = generateRandomNumbersArray(questionsToGenerate);
}
function getRandomNumberInRange(min, max) {
    min = Math.max(0, min);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let questionsForInquirer = [];
amountOfQuestions.map((num, index) => {
    let questionObject = {
        name: `answer${index + 1}`,
        type: "number",
        message: `Guess a number that is in between ${getRandomNumberInRange(Number(num) - 5, Number(num) - 1)} and ${getRandomNumberInRange(Number(num) + 1, Number(num) + 5)}`
    };
    questionsForInquirer.push(questionObject);
});
let allAnswersOfQuestions = await inquirer.prompt(questionsForInquirer);
function extractValuesFromArray(objToExtract) {
    return Object.values(objToExtract);
}
const extractedValues = extractValuesFromArray(allAnswersOfQuestions);
function calculateRightGuess(questionsArr, answersArr) {
    let rightAnswers = 0;
    for (let i = 0; i < questionsArr.length; i++) {
        if (Number(questionsArr[i]) === Number(answersArr[i])) {
            rightAnswers++;
        }
    }
    return rightAnswers;
}
const rightAnswers = calculateRightGuess(amountOfQuestions, extractedValues);
const winPercentage = (rightAnswers / amountOfQuestions.length) * 100;
console.log(`You gave ${rightAnswers} answers right out of ${amountOfQuestions.length} questions and you got ${winPercentage.toFixed(2)}%`);
