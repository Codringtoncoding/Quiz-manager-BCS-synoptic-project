# Quiz-manager-BCS-synoptic-project

Quiz manager BCS synoptic project - Apprenticeship project.

This setup presumes that you have node.js and NPM setup aswell as MySql workbench installed.

1. Clone the application from the repo
2. Create an new schema called quiz_manager
3. Go File > Run SQL script and run the following script `quizdata.sql` found in the Database folder.
4. The 'Default Schema Name' should be set to the schema you want to dump all the data in. 
5. If this doesn't work then create a new database and run the Sql scripts `Quiz-manager-BCS-synoptic-project/quiz-manager/public/SqlScripts/datascriptsToRun.sql` 
6. This will create all the tables and add data to the quiz manager.

7. add a .env file to the root of the project with the following variable.
`AUTH_SECRET=hello`

8. Connect to your database here if your details are different and adjust accordingly:

`const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "quiz_manager",
});`

9. Run NPM `Install to create the dependenices`
10. run the app by running DEBUG=myapp:* npm start   

 ****important In order to add the users to the database run the script in `quiz-manager/services/loadingData/userload.js` by using the command `node /userload.js` when inside the loadingData folder ****
