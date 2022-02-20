import mysql from "mysql";
import { databaseOptions } from "../config/config";

const connection = mysql.createConnection(databaseOptions);

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default connection;
