//creating router object using express's build in Router() method
const router = require("express").Router();

//importing our modular routes for notes
const notesRouter = require("./notes.js");

//using router middleware to handle routing functions
router.use("/notes", notesRouter);

//exporting the router so that it can be imported where needed
module.exports = router;
