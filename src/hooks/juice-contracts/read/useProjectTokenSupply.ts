import { useContext, useEffect } from 'react';
import { getJBTokenStore } from 'juice-sdk';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractReadHookResponse, ProjectId } from 'types';

import { JuiceContext } from '../../../contexts/JuiceContext';
import useHookState from '../../useHookState';

type DataType = BigNumber;

export default function useProjectTokenSupply({
  projectId,
}: {
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBTokenStore(provider)
      .totalSupplyOf(projectId)
      .then(supply => {
        actions.setLoading(false);
        actions.setData(supply);
      })
      .catch(e => {
        actions.setError(e);
      });
  }, [projectId, actions, provider]);

  return { loading, data, error };
}
