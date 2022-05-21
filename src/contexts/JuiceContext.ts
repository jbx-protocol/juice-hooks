import { createContext } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";

export const JuiceContext: React.Context<{
  provider?: JsonRpcProvider;
}> = createContext({});
