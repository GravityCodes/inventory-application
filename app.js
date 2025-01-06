const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const indexRouter = require("./routes/indexRouter");
const categoryRouter = require("./routes/categoryRouter");
const computerRouter = require("./routes/computerRouter");

app.use(express.urlencoded({ extended: true }));
//asset path
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//view engine settings
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/category",categoryRouter );
app.use("/computer", computerRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
