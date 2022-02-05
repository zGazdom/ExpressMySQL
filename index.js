const mysql = require("mysql2");
const ejs = require("ejs");
const https = require("https");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "FRIZERAJ",
});

const express = require("express");
const { getMaxListeners } = require("process");
const app = express();

app.use(express.static("views"));
app.set("view engine", "ejs");
connection.connect();

app.get("/", (req, res) => {
  connection.query(
    "SELECT * from FRIZERAJ.TERMIN",
    function (err, rows, fields) {
      if (err) throw err;
      res.render("index", { REZULTAT: rows });
    }
  );
});
app.get("/utorak", (req, res) => {
  connection.query(
    "SELECT sat FROM FRIZERAJ.TERMIN WHERE dan='utorak' ",
    function (err, rows, fields) {
      if (err) throw err;
      res.render("index", { REZULTAT: rows });
    }
  );
});

app.get("/termini", (req, res) => {
  connection.query(
    "SELECT sat FROM FRIZERAJ.TERMIN",
    function (err, result, fields) {
      if (err) throw err;
      let status = { created: "no", deployed: "no" };

      result.forEach((element) => {
        check_kids_status(element, status);
      });
      res.render("main", { termini: result });
    }
  );
});

app.listen(3000);