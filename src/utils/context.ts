import React from "react";

export function createContext<T>(defaultValue: T): [React.Context<T>, () => T] {
  const Context = React.createContext<T>(defaultValue);
  const useContext = () => React.useContext(Context);
  return [Context, useContext];
}
