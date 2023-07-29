import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const basePath = "https://bored-api.appbrewery.com/";

async function makeAxiosReq(req, res, path) {
  console.log(path)
  try {
    const response = await axios.get(path);
    let result = response.data;
    if(result.length > 0) {
      const rndmNr = Math.round(Math.random()*result.length);
      console.log(rndmNr);
      result = result[rndmNr];
    } else {
      result = result;
    }
    console.log(result);
    res.render("index.ejs", {data: result})
  } catch (error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
}

app.get("/", async (req, res) => {
  res.render("index.ejs")
});

app.post("/", async (req, res) => {
  console.log("clicked")
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
