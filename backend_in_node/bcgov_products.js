var express = require('express');
var app = express();
var path = require("path");
const bodyParser = require('body-parser')
var port = 3000;

const cors = require('cors');


router = express.Router();
app.use(router);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
})) 

app.use(express.json());

app.use(cors({
  origin: '*'//['http://localhost:5000, localhost:5000']
}));

app.use("/api", require("./routes/get"));
app.use("/api", require("./routes/post"));
app.use("/api", require("./routes/patch"));
app.use("/api", require("./routes/delete"));


app.listen(port);

console.log('BC Gov Products API server started on port : ' + port)