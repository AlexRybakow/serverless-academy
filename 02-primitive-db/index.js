import fs from 'fs';
import inquirer from 'inquirer';
import {userQuestions, searchQuestions } from './utils.js';

async function addUser() {
  const firstName = await inquirer.prompt(userQuestions[0]); 
  if (!firstName.name) {
    return searchUser();
  }

  const userGender = await inquirer.prompt(userQuestions[1]); 

  let userAge = await inquirer.prompt(userQuestions[2]); 
  if (userAge.age === NaN || userAge.age === '') {
    console.log('Please type correct age');
    userAge = await inquirer.prompt(questions[2]);
  }

  fs.appendFileSync("users.txt", JSON.stringify({...firstName, ...userGender, ...userAge}) + "\n"); 
  addUser()
}

async function searchUser() {
  const askNameForSearch = await inquirer.prompt(searchQuestions[0]);
  const dbData = fs.readFileSync("users.txt", "utf8");
  const users = dbData.split('\n').slice(0,-1).map(user => JSON.parse(user))
  const foundUsers = users.filter(user => {
    return user.name.toLowerCase() === askNameForSearch.name.toLowerCase()
  }).map(e => JSON.stringify(e));

  if (foundUsers.length < 1) {
    console.log("No users found");
  } else if (foundUsers.length === 1) {
    console.log(`User ${askNameForSearch.name} was found`)
    console.log(foundUsers[0]);
  }
  const askSearchAgain = await inquirer.prompt(searchQuestions[1]);
  if (askSearchAgain.confirm) {
    searchUser() 
  } else {
    console.log('Goodbye!');
      process.exit();
  }
};

addUser();

