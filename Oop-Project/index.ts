import inquirer from "inquirer";

class Person {
    private personality: string;
    constructor(personality?: string) {
        this.personality = personality ? personality : "Mystery"
    }
    public askQuestion(personalityType: number): void {
        if (personalityType === 1) {
            this.personality = "Extravert"
        } else if (personalityType === 2) {
            this.personality = "Introvert"
        } else {
            this.personality = "still a mystery"
        }
    }
    public getPersonality(): string {
        return this.personality
    }
}

class Student extends Person {
    private _name;

    constructor(personality: string) {
        super(personality)
        this._name = ""
    }


    get name(): string {
        return this._name
    }

    set name(v: string) {
        this._name = v;
    }
}


let questionOne: {
    typeUser: string,
} = await inquirer.prompt({
    name: "typeUser",
    message: "Type 1 if you like to talk to others and type 2 if you would rather keep to yourself",
    type: "input"
})

let myPerson = new Person()

if (questionOne.typeUser === "1") {
    myPerson.askQuestion(Number(questionOne.typeUser))
} else if (questionOne.typeUser === "2") {
    myPerson.askQuestion(Number(questionOne.typeUser))
} else {
    console.log("Please enter a valid number")
}

let questionTwo: {
    userName: string,
} = await inquirer.prompt({
    name: "userName",
    message: "What is your name:",
    type: "input"
})


let myStudent = new Student(myPerson.getPersonality())
myStudent.name = questionTwo.userName

console.log(`Your Name is ${myStudent.name} and your personality is ${myStudent.getPersonality()}`)