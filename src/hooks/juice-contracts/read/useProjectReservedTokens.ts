import { useContext, useEffect } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { getJBController } from "juice-sdk";
import { JuiceContext } from "../../../contexts/JuiceContext";
import useHookState from "../../useHookState";

type DataType = BigNumber;

export default function useProjectReservedTokenBalance({
  projectId,
  reservedRate,
}: {
  projectId: ProjectId;
  reservedRate: BigNumber;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBController(provider)
      .reservedTokenBalanceOf(projectId, reservedRate)
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
