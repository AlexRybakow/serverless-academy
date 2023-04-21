import { readFileSync, writeFileSync } from 'fs';

// read the original JSON file
const data = readFileSync('developers.json');
const developers = JSON.parse(data);

// create a new array to hold the transformed data
const transformedData = [];

// loop through each developer in the original data
developers.forEach(developer => {
    const { user, startDate, endDate } = developer;
    const existingUser = transformedData.find((item) => item.userId === user._id);
    
    if (existingUser) {
        const newDate = { startDate: startDate, endDate: endDate };
        existingUser.vacations.push(newDate);
      } 
    else {
      const newUser = {
        userId: user._id,
        userName: user.name,
        vacations: [
          {
            startDate: startDate,
            endDate: endDate,
          },
        ],
      };
      transformedData.push(newUser);
    }
  });

// convert the transformed data to JSON and write it to a file
writeFileSync('transformed.json', JSON.stringify(transformedData), 'utf8');
