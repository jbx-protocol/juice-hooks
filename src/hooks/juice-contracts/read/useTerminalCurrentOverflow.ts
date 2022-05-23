import { useContext, useEffect } from 'react';
import { getJBSingleTokenPaymentTerminalStore } from 'juice-sdk';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractReadHookResponse, ProjectId } from 'types';

import { JuiceContext } from '../../../contexts/JuiceContext';
import useHookState from '../../useHookState';

type DataType = BigNumber;

export default function useTerminalCurrentOverflow({
  terminalAddress,
  projectId,
}: {
  terminalAddress: string;
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBSingleTokenPaymentTerminalStore(provider)
      .currentOverflowOf(terminalAddress, projectId)
      .then(overflow => {
        actions.setLoading(false);
        actions.setData(overflow);
      })
      .catch(e => {
        actions.setError(e);
      });
  }, [projectId, terminalAddress, actions, provider]);

  return { loading, data, error };
}
