# BOOTCAMP-EXPRESS

> This is a basic Node.js web application that uses the Express framework for handling HTTP requests and responses. The application provides simple user registration and login functionality with password verification and token authentication using JSON web tokens.

## Installation
### To use this application, you need to have Node.js installed on your machine.

1 - Clone this repository using git clone.    
2 - Navigate to the project directory in your terminal.   
3 - Install the required dependencies using npm install.
## Usage
1 -  To start the application, run the command npm start or node app.js.    
2 - The application will be available at http://localhost:4000.   
3 - The application has three routes:
  - /: The main page of the application. If the user is not logged in, they will be redirected to the login page. Otherwise, they will see the index page.
  - /login: The login page. Users can enter their email and password to log in. If the login is successful, the user will be redirected to the main page.
  -  /register: The registration page. Users can enter their name, email, and password to create an account.
## Code Explanation
### The application uses the following libraries:

  - express: A Node.js web application framework for handling HTTP requests and responses.
  - fs: A Node.js library for interacting with the file system.
  - path: A Node.js library for working with file paths.
  - cookie-parser: A middleware for handling HTTP cookies.
### The application has the following endpoints:

  - GET /: The main page of the application. If the user is not logged in, they will be redirected to the login page. Otherwise, they will see the index page.
  - GET /login: The login page. Users can enter their email and password to log in. If the login is successful, the user will be redirected to the main page.
  - GET /register: The registration page. Users can enter their name, email, and password to create an account.
  - POST /login: Handles the login form submission. Checks if the user exists in the db.json file and verifies their password. If the login is successful, a JSON web token is generated and stored in a cookie.
  - POST /register: Handles the registration form submission. The user's data is added to the db.json file.
    The application uses fs to read and write data to the db.json file. When a user logs in, their credentials are checked against the data in the db.json file. If a user is not found or the password is incorrect, the appropriate error message is displayed. If the user is authenticated, a JSON web token is generated using the jwt library and stored in a cookie. The cookie is set to expire in 24 hours.

   The application uses cookie-parser middleware to handle HTTP cookies. The accessToken cookie is set when a user logs in and deleted when a user logs out.

   The application uses the ejs templating engine to generate dynamic HTML pages. The index.ejs, login.ejs, and register.ejs files are located in the views directory.

## License
This application is released under the MIT License. Feel free to modify and use it however you like!
