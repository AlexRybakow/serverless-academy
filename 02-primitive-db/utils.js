export const userQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter user name:'
      },
      {
        type: 'list',
        name: 'gender',
        message: 'Select gender:',
        choices: ['Male', 'Female', 'Other']
      },
      {
        type: 'number',
        name: 'age',
        message: 'Enter age:'
      }
]

export const searchQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter name to search:'
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to search name?'
      }
]
