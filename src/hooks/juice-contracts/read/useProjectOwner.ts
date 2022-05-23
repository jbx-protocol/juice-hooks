import { useContext, useEffect } from 'react';
import { getJBProjects } from 'juice-sdk';
import { ContractReadHookResponse, ProjectId } from 'types';

import { JuiceContext } from '../../../contexts/JuiceContext';
import useHookState from '../../useHookState';

type DataType = string;

export default function useProjectOwner({
  projectId,
}: {
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBProjects(provider)
      .ownerOf(projectId)
      .then(owner => {
        actions.setLoading(false);
        actions.setData(owner);
      })
      .catch(e => {
        actions.setError(e);
      });
  }, [projectId, actions, provider]);

  return { loading, data, error };
}
