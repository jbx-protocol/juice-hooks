import React, { useContext } from "react";

import {
  getJBDirectory,
  getJBSingleTokenPaymentTerminalStore,
} from "juice-sdk";
import { JuiceContext } from "../contexts/JuiceContext";

export default function useTerminalBalance({
  projectId,
}: {
  projectId: string;
}) {
  const { provider } = useContext(JuiceContext);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>();
  const [error, setError] = React.useState<any>();

  async function getBalance(projectId: string) {
    const terminals = await getJBDirectory(provider).terminalsOf(projectId);
    const primaryTerminal = terminals[0];

    const balance = await getJBSingleTokenPaymentTerminalStore(
      provider
    ).balanceOf(primaryTerminal, projectId);

    return balance;
  }

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
