import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

const App = () => (
  // ghost element, won't show in the dom
  <Fragment>
    <Navbar />
    <Landing />
  </Fragment>
);

export default App;
