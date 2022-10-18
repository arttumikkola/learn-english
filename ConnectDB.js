require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const words = express();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});
//Saves new word to the database
const connectionFunctions = {
  saveNewWord: (english, finnish) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO Words (english, finnish) VALUES (?, ?)",
        [english, finnish],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  //Deletes a word with specific id from the database
  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM Words WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  //Gets word with specific id from the database
  selectById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM Words WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  },
  //Gets all words from the database
  findAll: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM Words", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  //Gets all English words from the database
  findAllEnglish: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT id, english FROM Words", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  //Gets all Finnish words from the database
  findAllFinnish: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT id, finnish FROM Words", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  //Closes the database connection
  close: () =>
    new Promise((resolve, reject) => {
      connection.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve("db connection closed");
        }
      });
    }),
  getConnection: () => connection,
};

module.exports = connectionFunctions;
