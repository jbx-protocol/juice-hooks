import { useContext, useEffect } from "react";

import { getJBSingleTokenPaymentTerminalStore } from "juice-sdk";
import { JuiceContext } from "contexts/JuiceContext";
import useHookState from "hooks/useHookState";
import { BigNumber } from "@ethersproject/bignumber";

type DataType = BigNumber;

export default function usePaymentTerminalBalance({
  terminalAddress,
  projectId,
}: {
  terminalAddress: string;
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBSingleTokenPaymentTerminalStore(provider)
      .balanceOf(terminalAddress, projectId)
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
