import { createContext } from "react";

const defaultContextValue = {
  isSite: true,
  dimensions: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  filteredData: {},
  user: {},
  allData: [],
  setAllData: (e) => {
    e;
  },
  setUser: (e) => {
    e;
  },
  setFilteredData: (e) => {
    e;
  },
};

const AppContext = createContext(defaultContextValue);

export default AppContext;
