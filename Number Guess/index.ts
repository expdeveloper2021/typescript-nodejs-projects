import inquirer, { Question } from "inquirer"
import chalk from "chalk"

console.log(chalk.bgRed.blue('Welcome to the Number Guess Game'));


let difficultyType: {
    levelUser: string;
} = await inquirer.prompt([{
    name: "levelUser",
    type: "list",
    choices: ["Basic", "Advanced", "Pro"],
    message: "Which level do you want to play?"
}]);

function generateRandomNumbersArray(x: number): number[] {
    let randomArray: Set<number> = new Set();

    while (randomArray.size < x) {
        let randomNumber = Math.floor(Math.random() * 20) + 1;
        randomArray.add(randomNumber);
    }

    return Array.from(randomArray);
}

let amountOfQuestions: number[] = []

if (difficultyType.levelUser === "Basic") {
    let questionsToGenerate: number = 2;
    amountOfQuestions = generateRandomNumbersArray(questionsToGenerate);
} else if (difficultyType.levelUser === "Advanced") {
    let questionsToGenerate: number = 4;
    amountOfQuestions = generateRandomNumbersArray(questionsToGenerate);
} else if (difficultyType.levelUser === "Pro") {
    let questionsToGenerate: number = 6;
    amountOfQuestions = generateRandomNumbersArray(questionsToGenerate);
}


interface QuestionObject {
    name: string;
    type: string;
    message: string;
}

function getRandomNumberInRange(min: number, max: number): number {
    min = Math.max(0, min);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let questionsForInquirer: Question[] = []
amountOfQuestions.map((num, index) => {
    let questionObject: QuestionObject = {
        name: `answer${index + 1}`,
        type: "number",
        message: `Guess a number that is in between ${getRandomNumberInRange(Number(num) - 5, Number(num) - 1)} and ${getRandomNumberInRange(Number(num) + 1, Number(num) + 5)}`
    }
    questionsForInquirer.push(questionObject)
})

interface MyObject {
    [key: string]: any;
}

let allAnswersOfQuestions: MyObject = await inquirer.prompt(questionsForInquirer)

function extractValuesFromArray(objToExtract: MyObject): string[] {
    return Object.values(objToExtract);
}

const extractedValues: string[] = extractValuesFromArray(allAnswersOfQuestions);

function calculateRightGuess(questionsArr: any[], answersArr: any[]): number {
    let rightAnswers = 0;

    for (let i = 0; i < questionsArr.length; i++) {
        if (Number(questionsArr[i]) === Number(answersArr[i])) {
            rightAnswers++;
        }
    }

    return rightAnswers;
}

const rightAnswers: number = calculateRightGuess(amountOfQuestions, extractedValues);
const winPercentage: number = (rightAnswers / amountOfQuestions.length) * 100;
console.log(`You gave ${rightAnswers} answers right out of ${amountOfQuestions.length} questions and you got ${winPercentage.toFixed(2)}%`);