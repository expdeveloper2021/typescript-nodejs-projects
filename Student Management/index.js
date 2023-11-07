import inquirer from 'inquirer';
// let allCourses: string[] = [
//     "MERN STACK",
//     "DIT",
//     "WEB 3.0",
//     "ARTIFICIAL INTELLIGENCE",
//     "METAVERSE",
// ]
// class Student {
//     static nextStudentId = 1; // Initial student ID
//     id: number;
//     name: string;
//     courses: string[];
//     balance: number;
//     constructor(name: string, balance: number) {
//         this.id = Student.nextStudentId++;
//         this.name = name;
//         this.courses = [];
//         this.balance = balance;
//     }
//     enroll(course: string) {
//         this.courses.push(course);
//     }
//     viewBalance() {
//         console.log(`Balance: $${this.balance}`);
//     }
//     payTuition(amount: number) {
//         this.balance -= amount;
//         console.log(`Paid $${amount}`);
//     }
//     showStatus() {
//         console.log(`Student ID: ${this.id}`);
//         console.log(`Name: ${this.name}`);
//         console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
//         this.viewBalance();
//     }
// }
// const students: Student[] = [];
// async function addStudent() {
//     const { name, balance } = await inquirer.prompt([
//         {
//             type: 'input',
//             name: 'name',
//             message: "Enter student's name:",
//         },
//         {
//             type: 'number',
//             name: 'balance',
//             message: "Enter student's balance:",
//         },
//     ]);
//     const student = new Student(name, balance);
//     students.push(student);
//     console.log(`Student ${student.name} added with ID ${student.id}`);
// }
// async function enrollStudent() {
//     const { studentId, course } = await inquirer.prompt([
//         {
//             type: 'input',
//             name: 'studentId',
//             message: "Enter student ID:",
//         },
//         {
//             type: 'list',
//             choices: allCourses,
//             name: 'course',
//             message: 'Enter course name:',
//         },
//     ]);
//     const student = students.find(s => s.id === parseInt(studentId));
//     if (student) {
//         student.enroll(course);
//         console.log(`${student.name} enrolled in ${course}`);
//     } else {
//         console.log('Student not found.');
//     }
// }
// // Other functions (view balance, pay tuition, show status) can be implemented similarly.
// async function main() {
//     while (true) {
//         const { choice } = await inquirer.prompt([
//             {
//                 type: 'list',
//                 name: 'choice',
//                 message: 'Select an option:',
//                 choices: [
//                     'Add Student',
//                     'Enroll Student',
//                     // Add other choices here
//                     'Exit',
//                 ],
//             },
//         ]);
//         switch (choice) {
//             case 'Add Student':
//                 await addStudent();
//                 break;
//             case 'Enroll Student':
//                 await enrollStudent();
//                 break;
//             // Implement other cases here
//             case 'Exit':
//                 console.log('Exiting...');
//                 return;
//             default:
//                 console.log('Invalid choice.');
//         }
//     }
// }
// main();
let allCourses = [];
let allInstructors = [];
let allStudents = [];
class Instructor {
    name;
    age;
    salary;
    coursesAssigned;
    static id = 0;
    id; // Add an id property to the class
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.id = Instructor.id++; // Assign the static id to the instance's id property
        this.coursesAssigned = [];
    }
}
class Course {
    name;
    timing;
    fees;
    instructor;
    students;
    static id = 0;
    id; // Add an id property to the class
    constructor(name, timing, fees) {
        this.name = name;
        this.timing = timing;
        this.fees = fees;
        this.instructor = null;
        this.students = [];
        this.id = Course.id++; // Assign the static id to the instance's id property
    }
    assignInstructor(instructorId) {
        let indexOfInstructor = allInstructors.findIndex((instructor) => {
            return instructor.id === instructorId;
        });
        let indexOfCourse = allCourses.findIndex((instructor) => {
            return instructor.name === this.name;
        });
        if (indexOfInstructor !== -1) {
            allInstructors[indexOfInstructor].coursesAssigned.push(allCourses[indexOfCourse].id);
            this.instructor = instructorId;
        }
    }
    enrollStudent(studentNumberId) {
        this.students.push(studentNumberId);
    }
}
class Student {
    name;
    enrolled_courses;
    balance = 1000;
    static id = 0;
    id; // Add an id property to the class
    constructor(nameParam) {
        this.name = nameParam;
        this.enrolled_courses = [];
        this.id = Student.id++; // Assign the static id to the instance's id property
    }
    enrollToCourse(courseId) {
        let courseIndex = allCourses.findIndex((course) => {
            return course.id === courseId;
        });
        let indexOfStudent = allStudents.findIndex((student) => {
            return student.name === this.name;
        });
        if (courseIndex !== -1 && allCourses.length) {
            this.enrolled_courses.push(allStudents[indexOfStudent].id);
            allCourses[courseIndex].enrollStudent(allStudents[indexOfStudent].id);
        }
    }
}
let resultsFirst = await inquirer.prompt([
    {
        name: "actionType",
        type: "list",
        choices: ["Add Student", "Add Instructor", "Add Courses"]
    }
]);
if (resultsFirst.actionType === "Add Instructor") {
    let instructorQuestions = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter instructor name"
        },
        {
            name: "age",
            type: "number",
            message: "Enter instructor Age"
        },
        {
            name: "salary",
            type: "number",
            message: "Enter instructor's Salary"
        }
    ]);
    if (instructorQuestions) {
        const { name, age, salary } = instructorQuestions;
        let instructor = new Instructor(name, age, salary);
        allInstructors.push(instructor);
    }
}
else if (resultsFirst.actionType === "Add Student") {
    let studentQuestionsArr = [
        {
            name: "name",
            type: "input",
            message: "Enter Student name"
        },
    ];
    if (allCourses.length > 0) {
        let obj = {
            name: "course",
            type: "list",
            choices: allCourses.map(e => e.name)
        };
        studentQuestionsArr.push(obj);
    }
    let studentQuestions = await inquirer.prompt(studentQuestionsArr);
    if (studentQuestions) {
        const { name } = studentQuestions;
        let student = new Student(name);
        allStudents.push(student);
    }
}
else if (resultsFirst.actionType === "Add Course") {
    let studentQuestions = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter Course name"
        },
        {
            name: "timing",
            type: "input",
            message: "Enter Course timing"
        },
        {
            name: "fees",
            type: "number",
            message: "Enter Course fees"
        }
    ]);
    if (studentQuestions) {
        const { name, timing, fees } = studentQuestions;
        let course = new Course(name, timing, fees);
        allCourses.push(course);
    }
}
