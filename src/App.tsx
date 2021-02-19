import React from "react";
import { AppProvider } from "./context";
import Products from "./Products";
import List from "./List";

const App = () => (
  <AppProvider>
    <Products />
    <List />
  </AppProvider>
);

export default App;
