import React from "react";

import { JsonRpcProvider } from "@ethersproject/providers";
import {
  getJBDirectory,
  getJBSingleTokenPaymentTerminalStore,
} from "juice-sdk";

// 1. Create your JSON RPC provider with ethers.js
const RPC_HOST =
  "https://mainnet.infura.io/v3/c2838024e339438fbe8a31d6754efe8a";
const provider = new JsonRpcProvider(RPC_HOST);

async function getBalance(projectId: string) {
  // 2. Get a list of the project's terminals
  const terminals = await getJBDirectory(provider).terminalsOf(projectId);
  const primaryTerminal = terminals[0];

  // 3. Get the balance of the projects' primary terminal.
  const balance = await getJBSingleTokenPaymentTerminalStore(
    provider
  ).balanceOf(primaryTerminal, projectId);

  return balance;
}

export default function useTerminalBalance({
  projectId,
}: {
  projectId: string;
}) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>();
  const [error, setError] = React.useState<any>();

  React.useEffect(() => {
    setLoading(true);

    getBalance(projectId)
      .then((balance) => {
        setLoading(false);
        setData(balance);
      })
      .catch((e) => {
        setError(e);
      });
  }, [projectId]);

  return { loading, data, error };
}
