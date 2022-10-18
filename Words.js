const express = require("express");
const router = express.Router();
const connection = require("./ConnectDB.js");
//Route for getting all the words in the database
router.get("/", async (req, res) => {
  const word = await connection.findAll();
  res.send(word);
});
//Route for getting all English words in the database
router.get("/english", async (req, res) => {
  const word = await connection.findAllEnglish();
  res.send(word);
});
//Route for getting all Finnish words in the database
router.get("/finnish", async (req, res) => {
  const word = await connection.findAllFinnish();
  res.send(word);
});
//Route for deleting word with specific id from the database
router.delete("/:id", async (req, res) => {
  await connection.deleteById(req.params.id);
  res.status(204).end();
});
//Route for adding a new word to the database
router.post("/", async (req, res) => {
  const word = await connection.saveNewWord(req.body.english, req.body.finnish);
  res.send(word);
});
//Route for checking if the word entered by user is correct
router.post("/:id/check", async (req, res) => {
  const word = await connection.selectById(req.params.id);
  let correct = false;
  if (word.finnish.toLowerCase() === req.body.finnish.toLowerCase()) {
    correct = true;
  }
  res.send({ correct });
});
//Route for checking if the word entered by user is correct
router.post("/:id/check2", async (req, res) => {
  const word = await connection.selectById(req.params.id);
  let correct = false;
  if (word.english.toLowerCase() === req.body.english.toLowerCase()) {
    correct = true;
  }
  res.send({ correct });
});

module.exports = router;
