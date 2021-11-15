const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

app.post("/create", (req, res) => {
  const name = req.body.name;
  const puesto = req.body.puesto;

  db.query(
    "INSERT INTO empleados (nombre, cla_puesto) VALUES (?,?)",
    [name, puesto],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query(
    "SELECT * FROM empleados INNER JOIN puestos ON empleados.cla_puesto = puestos.cla_puesto",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/*  app.get("/id", (req, res) => {
    db.query('SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = "base" AND TABLE_NAME = "empleados"', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }); */

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM empleados WHERE clave = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/puestos", (req, res) => {
  db.query("SELECT * FROM puestos ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
