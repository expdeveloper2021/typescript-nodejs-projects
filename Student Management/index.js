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
    static id = 1;
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
    static id = 1;
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
        if (indexOfInstructor !== -1) {
            allInstructors[indexOfInstructor].coursesAssigned.push(this.id);
            this.instructor = instructorId;
        }
    }
    removeInstructor(instructorId) {
        let indexOfInstructor = allInstructors.findIndex((instructor) => {
            return instructor.id === instructorId;
        });
        if (indexOfInstructor !== -1) {
            let indexOfCourseInstructor = allInstructors[indexOfInstructor].coursesAssigned.findIndex((id) => {
                return id === instructorId;
            });
            if (indexOfCourseInstructor !== -1) {
                allInstructors[indexOfInstructor].coursesAssigned.splice(indexOfCourseInstructor, 1);
            }
            allInstructors[indexOfInstructor].coursesAssigned.push(this.id);
            this.instructor = instructorId;
        }
    }
    enrollStudent(studentNumberId) {
        this.students.push(studentNumberId);
    }
    cancelStudent(studentNumberId) {
        let indexOfStudent = this.students.findIndex((studentIDs) => {
            return studentIDs === studentNumberId;
        });
        if (indexOfStudent !== -1) {
            this.students.splice(indexOfStudent, 1);
        }
    }
}
class Student {
    name;
    enrolled_courses;
    balance = 1000;
    static id = 1;
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
        if (courseIndex !== -1 && allCourses.length) {
            this.enrolled_courses.push(courseId);
            allCourses[courseIndex].enrollStudent(this.id);
        }
    }
    deleteFromCourse(courseId) {
        let courseIndex = allCourses.findIndex((course) => {
            return course.id === courseId;
        });
        if (courseIndex !== -1 && allCourses.length) {
            this.enrolled_courses.push(this.id);
            let indexOfCourseId = this.enrolled_courses.findIndex((id) => {
                return id === courseId;
            });
            if (indexOfCourseId !== -1) {
                this.enrolled_courses.splice(indexOfCourseId, 1);
            }
            allCourses[courseIndex].cancelStudent(this.id);
        }
    }
}
async function performOperation() {
    let resultsFirst = await inquirer.prompt([
        {
            name: "actionType",
            type: "list",
            choices: ["Add Student", "Add Instructor", "Add Courses", "Edit", "Delete"]
        },
    ]);
    if (resultsFirst.actionType === "Delete" || resultsFirst.actionType === "Edit") {
        let resultsInner = await inquirer.prompt([
            {
                name: "actionType",
                type: "list",
                choices: ["Student", "Instructor", "Courses"]
            }
        ]);
        if (resultsInner.actionType === "Student") {
            if (allStudents.length > 0) {
                console.table(allStudents);
                let id = await getIDToPerformOperation();
                let findIdexViaId = allStudents.findIndex((student) => {
                    return student.id === id;
                });
                if (resultsFirst.actionType === "Delete") {
                    allStudents.splice(findIdexViaId, 1);
                    console.log("Student Deleted Successfully");
                    console.table(allStudents);
                }
            }
            else {
                console.log("Please Add any student");
            }
        }
        else if (resultsInner.actionType === "Instructor") {
            if (allInstructors.length > 0) {
                console.table(allInstructors);
                let id = await getIDToPerformOperation();
                let findIdexViaId = allInstructors.findIndex((student) => {
                    return student.id === id;
                });
                if (resultsFirst.actionType === "Delete") {
                    allInstructors.splice(findIdexViaId, 1);
                    console.log("Instructor Deleted Successfully");
                    console.table(allInstructors);
                }
            }
            else {
                console.log("Please Add any instructor");
            }
        }
        else if (resultsInner.actionType === "Courses") {
            if (allCourses.length > 0) {
                console.table(allCourses);
                let id = await getIDToPerformOperation();
                let findIdexViaId = allCourses.findIndex((student) => {
                    return student.id === id;
                });
                if (resultsFirst.actionType === "Delete") {
                    allCourses.splice(findIdexViaId, 1);
                    console.log("Course Deleted Successfully");
                    console.table(allCourses);
                }
            }
            else {
                console.log("Please Add any course");
            }
        }
    }
    else if (resultsFirst.actionType === "Add Instructor") {
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
            console.log("Instructor Added Successfully ====>", allInstructors[allInstructors.length - 1]);
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
            console.log("Student Added Successfully ====>", allStudents[allStudents.length - 1]);
        }
    }
    else if (resultsFirst.actionType === "Add Courses") {
        let courseQuestions = await inquirer.prompt([
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
        if (courseQuestions) {
            const { name, timing, fees } = courseQuestions;
            let course = new Course(name, timing, fees);
            allCourses.push(course);
            console.log("Course Added Successfully ====>", allCourses[allCourses.length - 1]);
        }
    }
    let reConfirmation = await inquirer.prompt({
        name: "selection",
        type: "confirm",
        message: "Do you want to exit?"
    });
    if (!reConfirmation.selection) {
        performOperation();
    }
}
async function getIDToPerformOperation() {
    let toEditDelete = await inquirer.prompt({
        name: "idNumber",
        type: "number",
        message: "Enter the ID to perform action"
    });
    return Number(toEditDelete.idNumber);
}
performOperation();
