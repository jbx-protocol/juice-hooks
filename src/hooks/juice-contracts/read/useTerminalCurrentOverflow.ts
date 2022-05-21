import { useContext, useEffect } from "react";

import { getJBSingleTokenPaymentTerminalStore } from "juice-sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { JuiceContext } from "contexts/JuiceContext";
import useHookState from "hooks/useHookState";

type DataType = BigNumber;

export default function useTerminalCurrentOverflow({
  terminal,
  projectId,
}: {
  projectId: ProjectId;
  terminal: string;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBSingleTokenPaymentTerminalStore(provider)
      .currentOverflowOf(terminal, projectId)
      .then((overflow) => {
        actions.setLoading(false);
        actions.setData(overflow);
      })
      .catch((e) => {
        actions.setError(e);
      });
  }, [projectId]);

  return { loading, data, error };
}
