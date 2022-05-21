import { useContext, useEffect } from "react";

import { getJBETHPaymentTerminal } from "juice-sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { JuiceContext } from "contexts/JuiceContext";
import useHookState from "hooks/useHookState";

type DataType = BigNumber;

export default function useETHPaymentTerminalFee({
  projectId,
}: {
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBETHPaymentTerminal(provider)
      .functions.fee(projectId)
      .then((fee: BigNumber) => {
        actions.setLoading(false);
        actions.setData(fee);
      })
      .catch((e) => {
        actions.setError(e);
      });
  }, [projectId]);

  return { loading, data, error };
}
