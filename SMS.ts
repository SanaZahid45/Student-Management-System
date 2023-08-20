// Importing the readline library for getting user input
import * as readline from 'readline';

// Creating an interface to interact with the user via the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Defining a Student class
class Student {
  // Static property to keep track of the last assigned student ID
  static lastStudentID = 0;
  // In simple terms, it's like having a shared counter for all students in the class, so each new student gets a new ID that's one higher than the previous student's ID.
  // class Student { ... }: You're defining a class named Student.
  // static lastStudentID = 0;: This line sets up a special property called lastStudentID that belongs to the class itself (not individual student instances). The static keyword means it's shared among all instances of the Student class.

  // Properties for student details
  studentID: number;
  name: string;
  enrolledCourses: string[];
  balance: number;

  // Constructor to create a new student instance
  constructor(name: string) {
    this.studentID = ++Student.lastStudentID;
    this.name = name;
    this.enrolledCourses = [];
    this.balance = 0;
  }
  //The constructor is the starting point when creating an object, where you set its initial properties.
//this is like the object's way of referring to itself, used to access its own parts (properties and methods) when you're working inside the object's code.

  // Method to enroll in a course
  enroll(course: string) {
    this.enrolledCourses.push(course);
  }
 // Think of it as if you have a checklist of courses, and each time a student enrolls, they simply add a new course to their list.


  // Method to view balance
  viewBalance() {
    console.log(`Current balance: $${this.balance}`);
  }

  // Method to pay tuition
  payTuition(amount: number) {
    this.balance -= amount;
    console.log(`Thank you for your payment of $${amount}. Remaining balance: $${this.balance}`);
  }

  // Method to show student status
  showStatus() {
    console.log(`Student ID: ${this.studentID}`);
    console.log(`Name: ${this.name}`);
    console.log(`Enrolled Courses: ${this.enrolledCourses.join(', ')}`); // Adds all the elements of an array into a string, separated by the specified separator string ,.
    console.log(`Balance: $${this.balance}`);
  }
}

// Function to get user input as a promise
function getInput(prompt: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(prompt, input => {
      resolve(input);
    });
  });
}

// Main program function
async function main() {
  console.log('Student Management System\n');

  // Get user input for student name and create a new student
  const name = await getInput('Enter student name: ');
  const student = new Student(name);
 // new Student(name) is like creating a real student with a specific name using the blueprint defined in the Student class.

  // Display student ID and successful creation
  console.log(`Student ID: ${student.studentID}`);
  console.log('Student created successfully.\n');

  let continueRunning = true;

  // Loop to display options and perform actions based on user input
  while (continueRunning) {
    console.log('Options:');
    console.log('1. Enroll in a course');
    console.log('2. View balance');
    console.log('3. Pay tuition');
    console.log('4. Show status');
    console.log('5. Exit');

    // In simple terms, this code sets up a loop that keeps showing a menu of options to the user. As long as the 
    // continueRunning flag is true, the loop will keep running and displaying the menu over and over again. It's a way 
    // to keep the program interactive and let the user make choices.

    // Get user's choice
    const choice = await getInput('Enter your choice: ');

    // Perform actions based on user's choice
    switch (choice) {
      case '1':
        const course = await getInput('Enter course name: ');
        student.enroll(course);
        console.log(`Enrolled in ${course} successfully.\n`);
        break;
      case '2':
        student.viewBalance();
        break;
      case '3':
        const paymentAmount = parseFloat(await getInput('Enter payment amount: '));
        student.payTuition(paymentAmount);
        break;
      case '4':
        student.showStatus();
        break;
      case '5':
        continueRunning = false;
        break;
      default:
        console.log('Invalid choice. Please enter a valid option.\n');
    }
  }

  // Close the input reader
  rl.close();
}

// Start the main program
main();

