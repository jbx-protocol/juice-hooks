import { useContext, useEffect } from "react";

import { getJBTokenStore } from "juice-sdk";
import { JuiceContext } from "../../../contexts/JuiceContext";
import useHookState from "../../useHookState";

type DataType = string;

export default function useProjectToken({
  projectId,
}: {
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBTokenStore(provider)
      .tokenOf(projectId)
      .then((token) => {
        actions.setLoading(false);
        actions.setData(token);
      })
      .catch((e) => {
        actions.setError(e);
      });
  }, [projectId]);

  return { loading, data, error };
}
