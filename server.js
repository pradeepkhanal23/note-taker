//importing necessary modules
const express = require("express");
const path = require("path");

//importing our main router as api which has all the routes defined in it
const api = require("./routes/index");

//initilizing app and port number for the application
const app = express();

//setting up the port number
const PORT = 3000;

app.use(express.static("public"));

//with the help of middleware, we redirect anything that starts with "/api"
// api will then handle the api requests
app.use("/api", api);

//index.html file is retured when the user is in the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//notes.html file is retured when the user goes to "/notes" router from the homepage
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

//any other route which is not specified in the backend will again throw the same homepage
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening in ${PORT}`);
});
