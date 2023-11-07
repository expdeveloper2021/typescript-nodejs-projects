import inquirer from "inquirer";
class Person {
    constructor(personality) {
        this.personality = personality ? personality : "Mystery";
    }
    askQuestion(personalityType) {
        if (personalityType === 1) {
            this.personality = "Extravert";
        }
        else if (personalityType === 2) {
            this.personality = "Introvert";
        }
        else {
            this.personality = "still a mystery";
        }
    }
    getPersonality() {
        return this.personality;
    }
}
class Student extends Person {
    constructor(personality) {
        super(personality);
        this._name = "";
    }
    get name() {
        return this._name;
    }
    set name(v) {
        this._name = v;
    }
}
let questionOne = await inquirer.prompt({
    name: "typeUser",
    message: "Type 1 if you like to talk to others and type 2 if you would rather keep to yourself",
    type: "input"
});
let myPerson = new Person();
if (questionOne.typeUser === "1") {
    myPerson.askQuestion(Number(questionOne.typeUser));
}
else if (questionOne.typeUser === "2") {
    myPerson.askQuestion(Number(questionOne.typeUser));
}
else {
    console.log("Please enter a valid number");
}
let questionTwo = await inquirer.prompt({
    name: "userName",
    message: "What is your name:",
    type: "input"
});
let myStudent = new Student(myPerson.getPersonality());
myStudent.name = questionTwo.userName;
console.log(`Your Name is ${myStudent.name} and your personality is ${myStudent.getPersonality()}`);
