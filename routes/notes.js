//importing necessarye modules and middlewares
const notes = require("express").Router();
const fs = require("fs");

notes.get("/", (req, res) => {
  res.send("Hello world");
});

//exporting notes router
module.exports = notes;
