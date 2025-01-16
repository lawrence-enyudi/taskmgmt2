const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const bcrypt = require("bcryptjs"); // Import bcrypt for hashing the password

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

// Generate random ID
const generateRandomId = () => {
  return crypto.randomBytes(16).toString("hex"); // Random 32-character hexadecimal string
};

app.post("/api/register", async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds set to 10

  const id = generateRandomId(); // Generate random id
  const query =
    "INSERT INTO user_accounts (id, email, password, first_name, last_name, phone_number, role) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [id, email, hashedPassword, firstName, lastName, phoneNumber, "user"],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error registering user" });
      } else {
        res.status(200).send({ message: "User registered successfully" });
      }
    }
  );
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM user_accounts WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error logging in" });
    } else if (results.length > 0) {
      const user = results[0];

      // Compare the hashed password with the stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).send({ message: "Login successful" });
      } else {
        res.status(401).send({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
