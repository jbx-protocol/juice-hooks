import { useContext, useEffect } from 'react';
import { getJBDirectory } from 'juice-sdk';
import { ContractReadHookResponse, ProjectId } from 'types';

import { JuiceContext } from '../../../contexts/JuiceContext';
import useHookState from '../../useHookState';

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
      .then(terminals => {
        actions.setLoading(false);
        actions.setData(terminals);
      })
      .catch(e => {
        actions.setError(e);
      });
  }, [projectId, actions, provider]);

  return { loading, data, error };
}
