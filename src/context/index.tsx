import { createContext } from "react";
// GLOBAL STORE
const initVals: any = {};
// Context for storing books related states
export const Context = createContext(initVals);
// Context for storing states related to UI.
export const UIContext = createContext(initVals);
