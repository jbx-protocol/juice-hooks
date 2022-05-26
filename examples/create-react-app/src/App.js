import "./App.css";
import Component from "./Component";
import { JsonRpcProvider } from "@ethersproject/providers";
import { JuiceProvider } from "juice-hooks";

const RPC_HOST =
  "https://mainnet.infura.io/v3/c2838024e339438fbe8a31d6754efe8a";

function App() {
  const provider = new JsonRpcProvider(RPC_HOST);

  return (
    <JuiceProvider provider={provider}>
      <div className="App">
        <Component></Component>
      </div>
    </JuiceProvider>
  );
}

export default App;
