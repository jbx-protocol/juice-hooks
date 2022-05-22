import { useContext, useEffect } from "react";

import { getJBTokenStore } from "juice-sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { JuiceContext } from "../../../contexts/JuiceContext";
import useHookState from "../../useHookState";

type DataType = BigNumber;

export default function useWalletTotalTokenBalance({
  walletAddress,
  projectId,
}: {
  walletAddress: string;
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBTokenStore(provider)
      .balanceOf(walletAddress, projectId)
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
