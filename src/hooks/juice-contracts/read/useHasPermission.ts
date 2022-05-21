import { useContext, useEffect } from "react";

import { getJBOperatorStore } from "juice-sdk";
import useProjectOwner from "./useProjectOwner";
import { JuiceContext } from "contexts/JuiceContext";
import useHookState from "../../../hooks/useHookState";

export enum V2OperatorPermission {
  "RECONFIGURE" = 1,
  "REDEEM" = 2,
  "MIGRATE_CONTROLLER" = 3,
  "MIGRATE_TERMINAL" = 4,
  "PROCESS_FEES" = 5,
  "SET_METADATA" = 6,
  "ISSUE" = 7,
  "CHANGE_TOKEN" = 8,
  "MINT" = 9,
  "BURN" = 10,
  "CLAIM" = 11,
  "TRANSFER" = 12,
  "REQUIRE_CLAIM" = 13,
  "SET_CONTROLLER" = 14,
  "SET_TERMINALS" = 15,
  "SET_PRIMARY_TERMINAL" = 16,
  "USE_ALLOWANCE" = 17,
  "SET_SPLITS" = 18,
}

type DataType = boolean;

export default function useHasPermission({
  address,
  projectOwnerAddress,
  projectId,
  permission,
}: {
  address: string;
  projectOwnerAddress: string;
  projectId: ProjectId;
  permission: V2OperatorPermission | V2OperatorPermission[];
}): ContractReadHookResponse<DataType> {
  const { data: owner } = useProjectOwner({ projectId });

  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBOperatorStore(provider)
      .hasPermissions(
        address,
        projectOwnerAddress,
        projectId,
        Array.isArray(permission) ? permission : [permission]
      )
      .then((hasPermissions) => {
        actions.setLoading(false);
        actions.setData(hasPermissions);
      })
      .catch((e) => {
        actions.setError(e);
      });
  }, [projectId]);

  return { loading, data, error };
}
