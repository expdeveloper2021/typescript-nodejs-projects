import inquirer from 'inquirer';

let allCourses: Course[] = []
let allInstructors: Instructor[] = []
let allStudents: Student[] = []

class Instructor {
    name: string
    age: number
    salary: number
    coursesAssigned: number[]
    static id: number = 1;
    id: number; // Add an id property to the class

    constructor(name: string, age: number, salary: number) {
        this.name = name
        this.age = age
        this.salary = salary
        this.id = Instructor.id++; // Assign the static id to the instance's id property

        this.coursesAssigned = []
    }
}

class Course {
    name: string
    timing: string
    fees: number | string
    instructor: number | null
    students: number[]
    static id: number = 1;
    id: number; // Add an id property to the class

    constructor(name: string, timing: string, fees: number | string) {
        this.name = name
        this.timing = timing
        this.fees = fees
        this.instructor = null;
        this.students = []
        this.id = Course.id++; // Assign the static id to the instance's id property
    }

    assignInstructor(instructorId: number) {
        let indexOfInstructor = allInstructors.findIndex((instructor) => {
            return instructor.id === instructorId
        })
        console.log(indexOfInstructor, '/see')
        if (indexOfInstructor !== -1) {
            allInstructors[indexOfInstructor].coursesAssigned.push(this.id)
            this.instructor = instructorId
        }
    }

    removeInstructor(instructorId: number) {
        let indexOfInstructor = allInstructors.findIndex((instructor) => {
            return instructor.id === instructorId
        })
        if (indexOfInstructor !== -1) {
            let indexOfCourseInstructor = allInstructors[indexOfInstructor].coursesAssigned.findIndex((id) => {
                return id === instructorId
            })
            if (indexOfCourseInstructor !== -1) {
                allInstructors[indexOfInstructor].coursesAssigned.splice(indexOfCourseInstructor, 1)
            }
            allInstructors[indexOfInstructor].coursesAssigned.push(this.id)
            this.instructor = instructorId
        }
    }

    enrollStudent(studentNumberId: number) {
        this.students.push(studentNumberId)
    }

    cancelStudent(studentNumberId: number) {
        let indexOfStudent = this.students.findIndex((studentIDs) => {
            return studentIDs === studentNumberId
        })
        if (indexOfStudent !== -1) {
            this.students.splice(indexOfStudent, 1)
        }
    }
}

class Student {
    name: string;
    enrolled_courses: number[]
    balance: number = 1000
    static id: number = 1;
    id: number; // Add an id property to the class

    constructor(nameParam: string) {
        this.name = nameParam
        this.enrolled_courses = []
        this.id = Student.id++; // Assign the static id to the instance's id property
    }

    enrollToCourse(courseId: number) {
        let courseIndex = allCourses.findIndex((course) => {
            return course.id === courseId
        })
        if (courseIndex !== -1 && allCourses.length) {
            this.enrolled_courses.push(courseId)
            allCourses[courseIndex].enrollStudent(this.id)
        }
    }

    deleteFromCourse(courseId: number) {
        let courseIndex = allCourses.findIndex((course) => {
            return course.id === courseId
        })

        if (courseIndex !== -1 && allCourses.length) {
            this.enrolled_courses.push(this.id)
            let indexOfCourseId = this.enrolled_courses.findIndex((id) => {
                return id === courseId
            })
            if (indexOfCourseId !== -1) {
                this.enrolled_courses.splice(indexOfCourseId, 1)
            }

            allCourses[courseIndex].cancelStudent(this.id)
        }
    }
}

async function performOperation() {
    let resultsFirst = await inquirer.prompt([
        {
            name: "actionType",
            type: "list",
            choices: ["Add Student", "Add Instructor", "Add Courses", "Edit", "Delete", "View"],
            message: "Select Action"
        },
    ])

    if (resultsFirst.actionType === "View") {
        let resultsInner = await inquirer.prompt([
            {
                name: "actionType",
                type: "list",
                choices: ["Student", "Instructor", "Courses"]
            }
        ])
        if (resultsInner.actionType === "Student") {
            if (allStudents.length > 0) {
                console.table(allStudents)
                let id = await getIDToPerformOperation()
                let findIndexViaId = allStudents.findIndex((student) => {
                    return student.id === id
                })
                if (findIndexViaId !== -1) {
                    let currentStudent = allStudents[findIndexViaId]
                    console.log(`Student Name: ${currentStudent.name} \nStudent ID: ${currentStudent.id} \nStudent Balance: ${currentStudent.balance}`)
                    if (currentStudent.enrolled_courses) {
                        console.log("Courses Enrolled:")
                        currentStudent.enrolled_courses.map((courseId, index) => {
                            console.log(`${index + 1}: ${getNameById(courseId, allCourses)}`)
                        })
                    }
                }
            } else {
                console.log("Please Add any student")
            }
        } else if (resultsInner.actionType === "Instructor") {
            if (allInstructors.length > 0) {
                console.table(allInstructors)
                let id = await getIDToPerformOperation()
                let findIndexViaId = allInstructors.findIndex((student) => {
                    return student.id === id
                })
                if (findIndexViaId !== -1) {
                    let currentInstructor = allInstructors[findIndexViaId]
                    console.log(`Instructor Name: ${currentInstructor.name} \nInstructor ID: ${currentInstructor.id} \nInstructor Salary: ${currentInstructor.salary} \nInstructor age ${currentInstructor.age}`)
                    if (currentInstructor.coursesAssigned) {
                        console.log("Courses Assigned TO Instructor:")
                        currentInstructor.coursesAssigned.map((courseId, index) => {
                            console.log(`${index + 1}: ${getNameById(courseId, allCourses)}`)
                        })
                    }
                }
            } else {
                console.log("Please Add any instructor")
            }
        } else if (resultsInner.actionType === "Courses") {
            if (allCourses.length > 0) {
                console.table(allCourses)
                let id = await getIDToPerformOperation()
                let findIndexViaId = allCourses.findIndex((student) => {
                    return student.id === id
                })
                if (findIndexViaId !== -1) {
                    let currentCourse = allCourses[findIndexViaId]
                    console.log(`Course Name: ${currentCourse.name} \nCourse ID: ${currentCourse.id} \nCourse Timing: ${currentCourse.timing} \nCouse Fees ${currentCourse.fees}`)
                    if (currentCourse.students) {
                        console.log("Students in Course:")
                        currentCourse.students.map((studentId, index) => {
                            console.log(`${index + 1}: ${getNameById(studentId, allStudents)}`)
                        })
                    }
                    if (currentCourse.instructor) {
                        console.log("Instructor Of Course:")
                        console.log(`${getNameById(currentCourse.instructor, allInstructors)}`)
                    }
                }
            } else {
                console.log("Please Add any course")
            }
        }
    } else if (resultsFirst.actionType === "Delete" || resultsFirst.actionType === "Edit") {
        let resultsInner = await inquirer.prompt([
            {
                name: "actionType",
                type: "list",
                choices: ["Student", "Instructor", "Courses"]
            }
        ])
        if (resultsInner.actionType === "Student") {
            if (allStudents.length > 0) {
                console.table(allStudents)
                let id = await getIDToPerformOperation()
                let findIndexViaId = allStudents.findIndex((student) => {
                    return student.id === id
                })
                if (resultsFirst.actionType === "Delete") {
                    allStudents.splice(findIndexViaId, 1)

                    allCourses.map((course) => {
                        if (course.students.includes(id)) {
                            course.instructor = null
                            let getIndex = course.students.findIndex((t) => {
                                return t === id
                            })
                            course.students.splice(getIndex, 1)
                        }
                    })

                    console.log("Student Deleted Successfully")
                    console.table(allStudents)
                }
            } else {
                console.log("Please Add any student")
            }
        } else if (resultsInner.actionType === "Instructor") {
            if (allInstructors.length > 0) {
                console.table(allInstructors)
                let id = await getIDToPerformOperation()
                let findIndexViaId = allInstructors.findIndex((student) => {
                    return student.id === id
                })
                if (resultsFirst.actionType === "Delete") {
                    allInstructors.splice(findIndexViaId, 1)

                    allCourses.map((course) => {
                        if (course.instructor === id) {
                            course.instructor = null
                        }
                    })

                    console.log("Instructor Deleted Successfully")
                    console.table(allInstructors)
                }
            } else {
                console.log("Please Add any instructor")
            }
        } else if (resultsInner.actionType === "Courses") {
            if (allCourses.length > 0) {
                console.table(allCourses)
                let id = await getIDToPerformOperation()
                let findIndexViaId = allCourses.findIndex((student) => {
                    return student.id === id
                })
                if (resultsFirst.actionType === "Delete") {
                    allCourses.splice(findIndexViaId, 1)

                    console.log("Course Deleted Successfully")
                    console.table(allCourses)
                }
            } else {
                console.log("Please Add any course")
            }
        }
    } else if (resultsFirst.actionType === "Add Instructor") {
        let instructorQuestionsArr: { name: string, type: string, message?: string, choices?: string[] }[] = [
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
        ]
        if (allCourses.length > 0) {
            let obj = {
                name: "course",
                type: "list",
                choices: allCourses.map(e => e.name),
                message: `Select course you want to assign to`
            }
            instructorQuestionsArr.push(obj)
        }

        let instructorQuestions = await inquirer.prompt(instructorQuestionsArr)

        if (instructorQuestions) {
            const { name, age, salary, course } = instructorQuestions
            let instructor = new Instructor(name, age, salary)

            allInstructors.push(instructor)

            if (course) {
                let currentCourseIndex = allCourses.findIndex((courseInner) => {
                    return courseInner.name === course
                })
                if (currentCourseIndex !== -1) {
                    allCourses[currentCourseIndex].assignInstructor(instructor.id)
                }
            }

            console.log("Instructor Added Successfully ====>", allInstructors[allInstructors.length - 1])
        }
    } else if (resultsFirst.actionType === "Add Student") {
        let studentQuestionsArr: { name: string, type: string, message?: string, choices?: string[] }[] = [
            {
                name: "name",
                type: "input",
                message: "Enter Student name"
            },
        ]
        if (allCourses.length > 0) {
            let obj = {
                name: "course",
                type: "list",
                choices: allCourses.map(e => e.name),
                message: `Select course you want to enroll in`
            }
            studentQuestionsArr.push(obj)
        }
        let studentQuestions = await inquirer.prompt(studentQuestionsArr)
        if (studentQuestions) {
            const { name, course } = studentQuestions
            let student = new Student(name)


            allStudents.push(student)

            if (course) {
                let currentCourseIndex = allCourses.findIndex((courseInner) => {
                    return courseInner.name === course
                })
                if (currentCourseIndex !== -1) {
                    student.enrollToCourse(allCourses[currentCourseIndex].id)
                }
            }

            console.log("Student Added Successfully ====>", allStudents[allStudents.length - 1])
        }
    } else if (resultsFirst.actionType === "Add Courses") {
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
        ])
        if (courseQuestions) {
            const { name, timing, fees } = courseQuestions
            let course = new Course(name, timing, fees)
            allCourses.push(course)

            console.log("Course Added Successfully ====>", allCourses[allCourses.length - 1])
        }
    }

    let reConfirmation = await inquirer.prompt({
        name: "selection",
        type: "confirm",
        message: "Do you want to exit?"
    })
    if (!reConfirmation.selection) {
        performOperation()
    }
}

async function getIDToPerformOperation() {
    let toEditDelete = await inquirer.prompt({
        name: "idNumber",
        type: "number",
        message: "Enter the ID to perform action"
    })

    return Number(toEditDelete.idNumber)
}

performOperation()

function getNameById(id: number, arrayMain: Student[] | Instructor[] | Course[]) {
    let filtered = arrayMain.filter((t) => {
        return t.id === id
    })
    if (filtered.length > 0) {
        return filtered[0].name
    }
}