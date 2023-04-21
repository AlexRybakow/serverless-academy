
To start the app run 'npm start'. This will call the startApp function, which suggests the user to enter some data. If the user enters "exit", the app closes. When the user's input is entered, it is split into an array of words and numbers.

Then, the startApp function will provide the user with different sorting options to choose from. If the user enters a valid sorting choice (a number from 1 to 6), the app calls the handleSortData function to sort the data and then prints the sorted data in the terminal. This process can be repeated until user types 'exit'.

If an invalid sorting choice is typed, the app will show an error message and call startApp again.