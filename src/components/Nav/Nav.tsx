import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import Heroes from "../Heroes/Heroes";
import HeroDetail from "../Heroes/Heroes-Detail/HeroDetail";
import Inicio from "../Inicio/Inicio";

import "./Nav.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

function Nav(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Router>
        <div className={classes.root}>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Marvel Heroes
              </Typography>
              <div className="btn-group">
                <Link to="/" className="btn btn-dark">
                  Inicio
                </Link>
                <NavLink
                  to="/heroes"
                  className="btn btn-primary"
                  activeClassName="active"
                >
                  Heroes
                </NavLink>
              </div>
            </Toolbar>
          </AppBar>
          <hr />
          <Switch>
            <Route path="/" exact>
              <Inicio />
            </Route>
            <Route path="/heroes" exact>
              <Heroes />
            </Route>
            <Route path="/heroes/:id" exact>
              <HeroDetail />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default Nav;
