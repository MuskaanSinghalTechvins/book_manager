import { createContext } from "react";
// GLOBAL STORE
const initVals: any = { initialLoading: false };
export const Context = createContext(initVals);
