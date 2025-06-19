const express = require("express");

const session = require("express-session");
const app = express();
const port = 3000;
// const loggedin = true;
const path = require("path");
// const timecheck = require("timecheck");
app.set("view engine", "ejs");
app.set("views", __dirname); // if EJS files are in same folder as app.js

function timecheck(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
}

app.use(
  session({
    secret: "mysecreujujnjku86liltkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "Sunny@123") {
    req.session.user = username;

    res.redirect("/dashboard");
  } else {
    res.send("invalid");
  }
});

app.get("/dashboard", timecheck, (req, res) => {
  // const { username, password } = req.body;
  // req.session.user = username;
  const username = req.session.user;
  res.render("dashboard", { username });
  // res.render(path.join(__dirname, "dashboard.html"));
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(" qworeking  ");
});
