const connection = require("./ConnectDB.js");
const words = require("./Words.js");
const express = require("express");
const app = express();
var cors = require("cors");
//Creates a server
function main() {
  const server = app.listen(8080, async () => {
    console.log(`listening on port ${server.address().port}`);
    try {
      app.use(express.json());
      app.use(cors());
      app.use("/Words", words);
      app.use(express.static("frontend/build"));
    } catch (err) {
      console.log(err);
    }
  });
}

main();
