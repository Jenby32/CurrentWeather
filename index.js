import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const apiKey = "40a40239479547f0bf2154453232907";
const baseUrl = "http://api.weatherapi.com/v1/current.json?key="+apiKey+"&q=";

let locArr = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  locArr = [];
  res.render("index.ejs")
});

app.post("/", async (req, res) => {
  console.log("clicked")
  const location = req.body.location
  const temperature = "25°";
  const icon = "X";
  const gridItemClass = "grid-item";

  try {
    const response = await axios.get(baseUrl+location)
    const gridItem = `<div class=${gridItemClass}>
                          <div class="grid-item1 flex-center"><img src="${response.data.current.condition.icon}"></img></div>
                          <div class="grid-item2 flex-center"><h1>${response.data.location.name}</h1></div>
                          <div class="grid-item3 flex-center"><h1>${response.data.current.temp_c}°</h1></div>
                      </div>`;
    locArr.push(gridItem)
    console.log(locArr);
    res.render("index.ejs", {data: locArr})
    console.log(response);
  } catch(error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
