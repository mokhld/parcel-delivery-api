Parcel Company API (Zava) Project
This project (orginally a takehome for Zava) has been created using Node.js, TypeScript, Express.js, MySQL.

= TASKS =
✅ Endpoints created to add/get/delete/update loads/trucks/parcels.
✅ The trucks, parcels and loads tables created in MySQL and used in the API.
✅ The trucks and the parcels tables associated with loads table.
✅ A truck can load/unload with a parcel.
✅ The number of parcels and the trucks’ weight can be taken with the loads API endpoint.
✅ Comment where needed have been added.
✅ Relevant Explanations added.

How to Setup
To run this project, install it locally using npm:

Node.js must be installed before running
https://nodejs.org/en/download/

Postman must be installed to use the file ./Read Me/ postman requests/ Parcel Company API.postman_collection.json

https://www.postman.com/downloads/

- To Run Project -

* Create a mysql database
* Create a .env file in the root of the folder with the following variables that match the credentials of your database:
  MYSQL_HOST
  MYSQL_USER
  MYSQL_PASSWORD
  MYSQL_DATABASE
  PORT
* Create tables by running queries in ./database/database-queries.txt
* npm install
* npm start
* Open your browser and type http://localhost:5000/trucks to get all the trucks and see API-Endpoints.pdf in ./README/postman-requests/API-Endpoints.pdf

- To Run Jest Test Scenarios -

* npm run test
