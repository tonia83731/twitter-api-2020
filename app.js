if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const helpers = require("./_helpers");
const apis = require("./routes");
const app = express();
const port = 3000;

const passport = require("./config/passport");

app.use(express.json());
// enable req.body
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
// app.use((req, res, next) => {
//   res.user = helpers.getUser(req);
//   next();
// });
app.use("/api", apis);
// app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`Example app listening on http://localhost:${port}`)
);

module.exports = app;
