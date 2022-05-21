import { useContext, useEffect } from "react";

import { getJBFundingCycleStore } from "juice-sdk";
import { JuiceContext } from "contexts/JuiceContext";
import useHookState from "hooks/useHookState";

export enum BallotState {
  "Active" = 0,
  "Approved" = 1,
  "Failed" = 2,
}

type DataType = BallotState;

export default function useBallotState({
  projectId,
}: {
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBFundingCycleStore(provider)
      .currentBallotStateOf(projectId)
      .then((owner) => {
        actions.setLoading(false);
        actions.setData(owner);
      })
      .catch((e) => {
        actions.setError(e);
      });
  }, [projectId]);

  return { loading, data, error };
}
