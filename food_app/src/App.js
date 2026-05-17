import React from "react";
import { BrowserRouter } from "react-router-dom";
import ToasterProvider from "./Providers/ToasterProvider";
import AppContextProvider from "./Context/AppContextProvider";
import Routers from "./Common/Routers";

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routers />
        <ToasterProvider />
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
