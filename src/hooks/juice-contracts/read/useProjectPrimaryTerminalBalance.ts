import React, { useContext } from "react";

import {
  getJBDirectory,
  getJBSingleTokenPaymentTerminalStore,
} from "juice-sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { JuiceContext } from "contexts/JuiceContext";
import useHookState from "hooks/useHookState";

type DataType = BigNumber;

export default function useProjectPrimaryTerminalBalance({
  projectId,
}: {
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);

  const { loading, data, error, actions } = useHookState<DataType>();

  async function getBalance(projectId: ProjectId) {
    const terminals = await getJBDirectory(provider).terminalsOf(projectId);
    const primaryTerminal = terminals[0];

    const balance = await getJBSingleTokenPaymentTerminalStore(
      provider
    ).balanceOf(primaryTerminal, projectId);

    return balance;
  }

  React.useEffect(() => {
    actions.setLoading(true);

    getBalance(projectId)
      .then((balance) => {
        actions.setLoading(false);
        actions.setData(balance);
      })
      .catch((e) => {
        actions.setError(e);
      });
  }, [projectId]);

  return { loading, data, error };
}
