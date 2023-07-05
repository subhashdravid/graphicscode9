import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import approuter from "./router/approuter"
dotenv.config()
const app = express()
const Port = process.env.PORT || 2000


app.set("view engine", "ejs");
app.use(express.static("public"));
// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
app.use(approuter)






app.listen(Port, () => {
    console.log(`Server started on http://localhost:${Port}`);
  });
  