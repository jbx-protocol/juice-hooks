import React, { useContext, useEffect } from "react";

import { getJBProjects } from "juice-sdk";
import { JuiceContext } from "../../../contexts/JuiceContext";
import useHookState from "../../useHookState";

type DataType = string;

export default function useProjectMetadataContent({
  projectId,
  domain,
}: {
  projectId: ProjectId;
  domain: string;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBProjects(provider)
      .metadataContentOf(projectId, domain)
      .then((cid) => {
        actions.setLoading(false);
        actions.setData(cid);
      })
      .catch((e) => {
        actions.setError(e);
      });
  }, [projectId, domain]);

  return { loading, data, error };
}
