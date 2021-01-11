import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "@material-ui/core";
import axios from "axios";
import "./Inicio.css";

const baseUrl = "http://157.245.138.232:9091/api/v1/test/superheroes";

function Inicio(): JSX.Element {
  const [data, setData] = useState([]);

  const history = useHistory();

  const viewHeroeDetails = (id: number) => {
    history.push(`/heroes/${id}`);
  };

  const AlertSuccess = () => {
    return <i className="fa fa-circle text-success pr-1"></i>;
  };

  const AlertDanger = () => {
    return <i className="fa fa-circle text-danger pr-1"></i>;
  };

  const getHeroes = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getHeroes();
  }, []);

  return (
    <Fragment>
      <Card>
        <div className="row animated fadeIn">
          <div className="card">
            <div className="card-header bg-dark text-white text-center">
              <h1>Heroes List</h1>
            </div>
            <div className="card-body">
              <ul className="list-group mb-3">
                {data.map((item: any) => {
                  let volar;
                  if (item.puedeVolar) {
                    volar = <AlertSuccess />;
                  } else {
                    volar = <AlertDanger />;
                  }
                  return (
                    <>
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between lh-condensed"
                      >
                        <div className="row"></div>
                        <div className="row">
                          <div className="col-md-4 text-center">
                            <img
                              src={item.avatarURL}
                              width="240px"
                              className="img-responsive img-thumbnail my-5"
                            ></img>
                          </div>
                          <div className="col-md-8">
                            <div>
                              <h4 className="d-flex justify-content-between align-items-center pl-4 mb-3">
                                <span className="text-muted">
                                  <strong>{item.nombre}</strong>
                                </span>
                              </h4>
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                  <h6 className="pl-2 my-0">
                                    <strong>Nombre Real:</strong>
                                    {" " + item.nombreReal}
                                  </h6>
                                </li>
                                <li className="list-group-item">
                                  <h6 className="pl-2 my-0">
                                    puede Volar: {volar}
                                  </h6>
                                </li>
                                <li className="list-group-item">
                                  <h6 className="pl-2 my-0">
                                    Habilidades:
                                    <ul className="list-group mb-3 pl-5">
                                      {item.habilidades.map(
                                        (special: string, i: number) => {
                                          return <li key={i}>{special}</li>;
                                        }
                                      )}
                                    </ul>
                                  </h6>
                                </li>
                                <li className="list-group-item">
                                  <h6 className="pl-2 my-0">
                                    {item.descripcion}
                                  </h6>
                                </li>
                                <li className="list-group-item">
                                  <small className="text-muted">
                                    <button
                                      className="btn btn-dark"
                                      onClick={() => {
                                        viewHeroeDetails(item.id);
                                      }}
                                    >
                                      <em>
                                        Heroe Data.
                                        <i className="fa fa-eye text-white pl-1"></i>
                                      </em>
                                    </button>
                                  </small>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div>
                          <span className="badge badge-secondary badge-pill float-right">
                            <i className="fa fa-user pr-1"></i> {item.id}
                          </span>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  );
}

export default Inicio;
