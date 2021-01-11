import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HeroDetail.css";
import { useHistory } from "react-router-dom";

function HeroDetail(): JSX.Element {
  const [data, setData] = useState([{}]);

  const { id } = useParams();

  const history = useHistory();

  const getback = (id: number) => {
    history.push(`/`);
  };

  const AlertSuccess = () => {
    return <i className="fa fa-circle text-success pr-1"></i>;
  };

  const AlertDanger = () => {
    return <i className="fa fa-circle text-danger pr-1"></i>;
  };

  const peticionGet = async () => {
    await axios
      .get(`http://157.245.138.232:9091/api/v1/test/superheroes/${id}`)
      .then((response) => {
        console.log(response);
        setData([response.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <>
      {data.map((item: any) => {
        let volar;
        if (item.puedeVolar) {
          volar = <AlertSuccess />;
        } else {
          volar = <AlertDanger />;
        }

        return (
          <Fragment>
            <div className="container">
              <div className="row animated fadeIn">
                <div className="card col-md-12 animated fadeIn cardFriendDetails">
                  <div className="card-header">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4 text-center">
                          <img
                            src={item.avatarURL}
                            width="240px"
                            className="img-responsive img-thumbnail my-5"
                          ></img>
                        </div>
                        <div className="col-md-8">
                          <ul className="list-group mb-3">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                              <span className="text-muted">
                                <strong>{item.nombre}</strong>
                              </span>
                              <span className="badge badge-secondary badge-pill">
                                ID: {item.id}
                              </span>
                            </h4>
                            <div className="row">
                              <div className="col-md-6">
                                {" "}
                                <h6 className="my-0">
                                  <strong>Nombre Real:</strong>{" "}
                                  {item.nombreReal}
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6 className="my-0 pr-1">
                                  Puede Volar: {volar}
                                </h6>
                              </div>
                            </div>
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                              <div>
                                <div className="card ">
                                  <div className="card-body">
                                    {item.descripcion}
                                  </div>
                                </div>
                                <button
                                  className="btn btn-dark"
                                  onClick={() => {
                                    getback(item.id);
                                  }}
                                >
                                  <em>
                                    Volver.
                                    <i className="fa fa-eye text-white pl-1"></i>
                                  </em>
                                </button>
                              </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                              <small className="text-muted">
                                <em>Hero Data.</em>
                              </small>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        );
        //console.log(item.id);
      })}
    </>
  );
}

export default HeroDetail;
