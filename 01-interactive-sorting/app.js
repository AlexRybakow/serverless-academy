import readline from 'readline';

const app = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function handleSortData(data, sortingChoice) {
  switch(sortingChoice) {
  case '1':
    data.sort();
    break;
    case '2':
    data.sort((a, b) => a - b);
    break;
    case '3':
    data.sort((a, b) => b - a);
    break;
    case '4':
    data.sort((a, b) => a.length - b.length);
    break;
    case '5':
    [...new Set(data)].sort();
    break;
    case '6':
    const uniqueData = [];
    data.forEach(value => {
      if (!uniqueData.includes(value)) {
        uniqueData.push(value);
      }
    });
    uniqueData.sort();
    break;
    default: 
    console.log('Please choose a number from 1 to 6')
  }
  return data;
}

function startApp() {
  app.question('Enter a few words or numbers separated by a space or "exit" to quit): ', (userInput) => {
    if (userInput === 'exit') {
      app.close();
    } else {
      const data = userInput.split(' ');
      const onlyNumber = /\d/; 
      const onlyWord = /\D/;
      
      app.question('How would you like to sort the data?\n' +
                  '1. Sort words alphabetically\n' +
                  '2. Show numbers from lesser to greater\n' +
                  '3. Show numbers from bigger to smaller\n' +
                  '4. Display words in ascending order by the number of letters in the word\n' +
                  '5. Show only unique words\n' +
                  '6. Display only unique values from the set of words and numbers entered by the user\n' +
                  'Choose a number from 1 to 6 or type "exit" to go back to data input: ', (sortingChoice) => {
        if (sortingChoice === 'exit') {
          app.close();
        } else if(['1', '4', '5'].includes(sortingChoice) && data.every(search => onlyNumber.test(search))) {
          console.log('there is no words, only numbers');
          startApp();
        } else if(['2', '3'].includes(sortingChoice) && data.every(search => onlyWord.test(search))) {
          console.log('there is no numbers, only words');
          startApp();
        } else if (['1', '2', '3', '4', '5', '6'].includes(sortingChoice)) {
          const sortedData = handleSortData(data, sortingChoice);
          console.log('Sorted data: ' + sortedData.join(' '));
          startApp();
        } else {
          console.log('Invalid choice. Please enter a number from 1 to 6.');
          startApp();
        }
      });
    }
  });
}

startApp();
