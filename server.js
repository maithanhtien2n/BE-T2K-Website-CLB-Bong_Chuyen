const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Khởi tạo ứng dụng
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Định tuyến các API endpoint
require("./app/central/route")(app);
require("./app/authentication/route")(app);
require("./app/introduce/route")(app);
require("./app/news/route")(app);
require("./app/workout-schedule/route")(app);
require("./app/member/route")(app);

// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port localhost:${port}.`);
});
