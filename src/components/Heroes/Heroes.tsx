import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import axios from "axios";

import { Card } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Hero } from "../../model/Hero";
import "./Heroes.css";
const baseUrl = "http://157.245.138.232:9091/api/v1/test/superheroes";

const columns = [
  { title: "ID", field: "id" },
  {
    title: "Nombre",
    field: "nombre",
    customFilterAndSearch: (term: any, rowData: any) =>
      term == rowData.nombre.length,
  },
  { title: "N.Real", field: "nombreReal" },
  {
    title: "Vuela",
    field: "puedeVolar",
  },
  { title: "Descripcion", field: "descripcion" },
];

function Heroes(): JSX.Element {
  const [data, setData] = useState([]);

  const peticionGetById = async () => {
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

  const history = useHistory();

  const viewHeroesDetails = (heroe: any, caso: string) => {
    console.log(heroe);
    console.log(caso);

    history.push(`/heroes/${heroe.id}`);
    /*setArtistaSeleccionado(artista);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();*/
  };

  useEffect(() => {
    peticionGetById();
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="row animated fadeIn">
          <div className="offset-md-1 col-md-10">
            <Card>
              <MaterialTable
                columns={columns}
                data={data}
                title="Heroes"
                actions={[
                  {
                    //icon: "remove_red_eye",
                    icon: "remove_red_eye",
                    tooltip: "Ver Heroe",
                    onClick: (event, rowData) =>
                      viewHeroesDetails(rowData, "Editar"),
                  },
                ]}
                options={{
                  actionsColumnIndex: -1,
                  filtering: true,
                  sorting: true,
                }}
                localization={{
                  header: {
                    actions: "Acciones",
                  },
                }}
              />
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Heroes;
