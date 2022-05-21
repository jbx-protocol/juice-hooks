import { PropsWithChildren } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";

import { JuiceContext } from "../contexts/JuiceContext";

export default function JuiceProvider({
  provider,
  children,
}: PropsWithChildren<{ provider: JsonRpcProvider }>) {
  return (
    <JuiceContext.Provider
      value={{
        provider,
      }}
    >
      {children}
    </JuiceContext.Provider>
  );
}
