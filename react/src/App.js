import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { useState } from "react";

import { Button, Container } from "reactstrap";

function App() {
  const [name, setName] = useState("");
  const [puesto, setPuesto] = useState(1);
  const [employeeList, setEmployeeList] = useState([]);
  const [puestosLista, setpuestosLista] = useState([]);

  const getEmployees = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmployeeList(response.data);
      console.log(response);
      console.log(response.data.length);
      //   getId();
    });
  };

  const getPuestos = () => {
    Axios.get("http://localhost:3001/puestos").then((response) => {
      setpuestosLista(response.data);
      console.log(response);
      console.log(response.data.length);
    });
  };

  /* const getId=()=>{
    Axios.get("http://localhost:3001/id").then((response) => {
      console.log(response.data[0].AUTO_INCREMENT);
          setIdSum(response.data[0].AUTO_INCREMENT);
    });
  }; */
  window.onload = function () {
    getEmployees();
    getPuestos();
  };

  const addEmpleado = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      puesto: puesto,
    }).then(() => {
      getEmployees();
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
      getEmployees();
    });
  };

  return (
    <Container>
      <br />
      <br />
      <h1 class="display-1|2|3|4">Registrar empleado</h1>

      <label>Nombre: </label>
      <input
        className="form-control"
        name="personaje"
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <br />

      <div class="mb-3">
        <label class="form-label">Puesto: </label>
        <select
          class="form-control"
          name="puestos"
          id="puestos"
          onChange={(event) => {
            switch (event.target.value) {
              case "Secretaria":
                return setPuesto(8);
              case "Desarrollador":
                return setPuesto(2);
              case "Gerente":
                return setPuesto(3);
              case "Administración":
                return setPuesto(4);
              case "Marketinig":
                return setPuesto(5);
              case "Redes":
                return setPuesto(11);
            }
          }}
        >
          {puestosLista.map((val) => {
            console.log("puesto es:", puesto);
            return <option>{val.puesto}</option>;
          })}
        </select>
      </div>
      <Button color="primary" onClick={addEmpleado}>
        Insertar
      </Button>

      <div className="employees">
        <br />
        <Button color="success" onClick={getEmployees}>
          Mostrar empleados
        </Button>
        <br /> <br />
        <h1 class="display-1|2|3|4">Empleados</h1>
        <br />
        {employeeList.map((val, key) => {
          return (
            <div key={key}>
              <div>
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">{val.nombre}</h4>
                    <p class="card-text">Puesto: {val.puesto}</p>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Id: {val.clave}</li>
                    <li class="list-group-item">Sueldo: {val.sueldo}$</li>
                    <li class="list-group-item">
                      <Button
                        color="danger"
                        onClick={() => {
                          deleteEmployee(val.clave);
                        }}
                      >
                        Eliminar
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default App;
