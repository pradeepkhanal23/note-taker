//importing necessarye modules and middlewares
const notes = require("express").Router();
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");

const uuid = require("../helpers/uuid");

//GET method for the notes
notes.get("/", (req, res) => {
  console.info(`${req.method} request received`);

  readFromFile("./db/notes.json").then((data) => {
    // because the readFile method returns a stringified data, we need to convert it to js object using JSON.parse()  method before sending it to the user
    return res.status(200).json(JSON.parse(data));
  });
});

//POST method for the notes
notes.post("/", (req, res) => {
  console.info(`${req.method} request received`);

  if (req.body) {
    const { title, text } = req.body;

    const newNote = {
      id: uuid(),
      title,
      text,
    };

    readAndAppend(newNote, "./db/notes.json");
    res.status(201).send({
      message: "note successfully created",
    });
  } else {
    res.send({
      error: "POST request failed",
    });
  }
});

//exporting notes router
module.exports = notes;
