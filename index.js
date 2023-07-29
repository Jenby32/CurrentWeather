import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

let locArr = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  locArr = [];
  res.render("index.ejs")
});

app.post("/", async (req, res) => {
  console.log("clicked")
  const content = req.body.location
  const gridItemClass = "grid-item";
  const div = "<div class="+gridItemClass+">"+content+"</div>"
  locArr.push(div)
  console.log(locArr);
  res.render("index.ejs", {data: locArr})
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
