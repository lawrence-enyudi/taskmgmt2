const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "task_management",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

app.post("/api/register", (req, res) => {
  const { email, password, fullName, phoneNumber } = req.body;
  const query =
    "INSERT INTO user_accounts (email, password, full_name, phone_number) VALUES (?, ?, ?, ?)";
  db.query(query, [email, password, fullName, phoneNumber], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error registering user" });
    } else {
      res.status(200).send({ message: "User registered successfully" });
    }
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM user_accounts WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error logging in" });
    } else if (results.length > 0) {
      res.status(200).send({ message: "Login successful" });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
