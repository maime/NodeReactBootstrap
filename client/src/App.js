import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./component/Home";
import Infoapi from "./component/Infoapi";
import Menu from "./component/Menu";

export default function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="infoapi" element={<Infoapi />} />
      </Routes>
    </>
  );
}
