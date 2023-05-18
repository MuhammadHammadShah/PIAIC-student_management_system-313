import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

// Initialize Chalk Animation
const rainbowAnimation = chalkAnimation.rainbow("Student Management System");

// Utility function to display messages with chalk styling
const showMessage = (message: string, color: string = "white") => {
  console.log(chalk.bgMagenta(message));
};

// Student data array
const students: { name: string; age: number; grade: number }[] = [];

// Function to display the main menu
const showMainMenu = async () => {
  showMessage("--- Main Menu ---", "cyan");
  const { option } = await inquirer.prompt([
    {
      name: "option",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add Student", "View Students", "Exit"],
    },
  ]);
  return option;
};

// Function to add a student
const addStudent = async () => {
  showMessage("--- Add Student ---", "green");
  const { name, age, grade } = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Enter student name:",
    },
    {
      name: "age",
      type: "number",
      message: "Enter student age:",
    },
    {
      name: "grade",
      type: "number",
      message: "Enter student grade:",
    },
  ]);
  students.push({ name, age, grade });
  showMessage(`Added student: ${name} (Age: ${age}, Grade: ${grade})`, "green");
};

// Function to view all students
const viewStudents = () => {
  showMessage("--- View Students ---", "yellow");
  if (students.length === 0) {
    showMessage("No students found!", "yellow");
  } else {
    students.forEach((student, index) => {
      showMessage(
        `Student ${index + 1}: ${student.name} (Age: ${student.age}, Grade: ${
          student.grade
        })`
      );
    });
  }
};

// Function to prompt the user if they want to repeat the program
const askRepeat = async () => {
  const { repeat } = await inquirer.prompt([
    {
      name: "repeat",
      type: "confirm",
      message: "Do you want to run the program again?",
    },
  ]);
  return repeat;
};

// Function to start the student management system
const startStudentManagement = async () => {
  showMessage("--- Student Management System ---", "magenta");
  let shouldExit = false;
  while (!shouldExit) {
    const option = await showMainMenu();
    switch (option) {
      case "Add Student":
        await addStudent();
        break;
      case "View Students":
        viewStudents();
        break;
      case "Exit":
        shouldExit = true;
        break;
      default:
        showMessage("Invalid option!", "red");
        break;
    }

    if (!shouldExit) {
      const repeat = await askRepeat();
      if (!repeat) {
        shouldExit = true;
      }
    }
  }
  rainbowAnimation.stop();
  showMessage("Exiting the program. Goodbye!", "magenta");
};

// Start the student management system
startStudentManagement();
