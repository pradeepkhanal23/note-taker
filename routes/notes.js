//importing necessarye modules and middlewares
const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

const uuid = require("../helpers/uuid");

//GET method for the notes
notes.get("/", (req, res) => {
  console.info(`${req.method} request received`);

  readFromFile("./db/notes.json").then((data) => {
    let parsedData = JSON.parse(data);
    // because the readFile method returns a stringified data, we need to convert it to js object using JSON.parse()  method before sending it to the user
    return res.status(200).json(parsedData);
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

//DELETE method for the notes
notes.delete("/:noteId", (req, res) => {
  console.log(`${req.method} method received`);

  readFromFile("./db/notes.json")
    .then((data) => {
      const receivedId = req.params.noteId;

      // because the readFile method returns a stringified data, we need to convert it to js object using JSON.parse()  method before sending it to the user
      let savedNotes = JSON.parse(data);

      //filtering the notes based on the id
      savedNotes = savedNotes.filter((note) => {
        if (note.id !== receivedId) {
          return note;
        }
      });

      //writing the new updated notes to the db/notes.json file
      writeToFile("./db/notes.json", savedNotes);

      //successful status code send back to the user
      res.status(200).send({
        message: "note successfully deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        message: "couldn't read the file",
      });
    });
});

//exporting notes router
module.exports = notes;
