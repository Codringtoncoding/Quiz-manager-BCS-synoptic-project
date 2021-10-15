# Quiz-manager-BCS-synoptic-project

Quiz manager BCS synoptic project - Apprenticeship project.

This setup presumes that you have node.js setup.

1. Clone the application from the repo
2. There is a folder that contains the database script information in Database/quizdata. Run the contents of this file provided you have MySQL workbench installed by opening the script.
3. If this doesn't work then create a new database and run the Sql script `Quiz-manager-BCS-synoptic-project/quiz-manager/public/SqlScripts/datascriptsToRun.sql` 
4. This will create all the tables and add data to the quiz manager.

5. add a .env file to the root of the project with the following variable.
AUTH_SECRET=hello

6. ****important In order to add the users to the database run the script `quiz-manager/services/loadingData/userload.js` ****
