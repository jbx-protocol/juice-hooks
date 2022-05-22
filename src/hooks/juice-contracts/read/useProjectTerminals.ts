import { useContext, useEffect } from "react";

import { getJBDirectory } from "juice-sdk";
import { JuiceContext } from "../../../contexts/JuiceContext";
import useHookState from "../../useHookState";

type DataType = string[];

export default function useProjectTerminals({
  projectId,
}: {
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBDirectory(provider)
      .terminalsOf(projectId)
      .then((terminals) => {
        actions.setLoading(false);
        actions.setData(terminals);
      })
      .catch((e) => {
        actions.setError(e);
      });
  }, [projectId]);

  return { loading, data, error };
}
