import React from "react";

import { JsonRpcProvider } from "@ethersproject/providers";
import { getJBProjects } from "juice-sdk";

// 1. Create your JSON RPC provider with ethers.js
const RPC_HOST =
  "https://mainnet.infura.io/v3/c2838024e339438fbe8a31d6754efe8a";
const provider = new JsonRpcProvider(RPC_HOST);

async function getOwner(projectId: string) {
  // 2. Get a list of the project's terminals
  const owner = await getJBProjects(provider).ownerOf(projectId);

  return owner;
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

    getOwner(projectId)
      .then((owner) => {
        setLoading(false);
        setData(owner);
      })
      .catch((e) => {
        setError(e);
      });
  }, [projectId]);

  return { loading, data, error };
}
