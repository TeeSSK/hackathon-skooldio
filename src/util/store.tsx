import React, { createContext, useState } from "react";

// Create a new context
export const StoreContext = createContext([]);

// Create a provider component to wrap around your app
export const StoreProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState([]);
  const [topic, setTopic] = useState("");

  // Define any actions or functions that manipulate the global variable
  const updateGlobalVariable = (newValue) => {
    setGlobalVariable(newValue);
  };

  const updateTopic = (newValue) => {
    setTopic(newValue);
  };

  // Pass the global variable and actions as the value of the context provider
  const store = {
    globalVariable,
    updateGlobalVariable,
    topic,
    updateTopic,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
