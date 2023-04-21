const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'content');
const filesText = Array.from({ length: 20 }, (_, i) => `out${i}.txt`);

// find unique usernames
const getUniqueUsernames = () => {
  const uniqueUsernames = new Set();
  filesText.forEach(function (file) {
    const fileContent = fs.readFileSync(path.join(directory, file), 'utf-8');
    const usernamesArray = fileContent.split('-');
    usernamesArray.forEach(name => uniqueUsernames.add(name));
  });
  return uniqueUsernames;
}

// find usernames repeating in all files
const getAllOccurrences = () => {
  let repeatedNames = null;
  filesText.forEach(function (file) {
    const fileContent = fs.readFileSync(path.join(directory, file), 'utf-8');
    const commonForAllFiles = new Set(fileContent.split('-'));
    if (!repeatedNames) {
      repeatedNames = commonForAllFiles;
    } else {
      repeatedNames = new Set([...repeatedNames].filter(username => commonForAllFiles.has(username)));
    }
  });
  return repeatedNames;
}

// find usernames repeating in at least 10 files
const getOccurrencesIn10Files = () => {
  const usernameCounter = new Map();
  filesText.forEach(function (file) {
    const fileContent = fs.readFileSync(path.join(directory, file), 'utf-8');
    const namesArray = fileContent.split('-');

    namesArray.forEach(function (name) {
      const count = usernameCounter.get(name) || 0;
      usernameCounter.set(name, count + 1);
    })
  })
  const usernamesInTenFiles = [...usernameCounter].filter(([name, count]) => count >= 10);
  const tenFilesRepeatsLength = usernamesInTenFiles.length;
  return tenFilesRepeatsLength;
}

// Track time 
console.time("Search is done")
console.log(`There are ${getUniqueUsernames().size} unique usernames in all the specified files.`);
console.log(`There are ${getAllOccurrences().size} usernames that occur in all 20 files.`);
console.log(`There are ${getOccurrencesIn10Files()} usernames that occur in at least 10 files.`);
console.timeEnd("Search is done")
