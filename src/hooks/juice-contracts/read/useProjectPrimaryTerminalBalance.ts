import React, { useCallback, useContext } from 'react';
import {
  getJBDirectory,
  getJBSingleTokenPaymentTerminalStore,
} from 'juice-sdk';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractReadHookResponse, ProjectId } from 'types';

import { JuiceContext } from '../../../contexts/JuiceContext';
import useHookState from '../../useHookState';

type DataType = BigNumber;

export default function useProjectPrimaryTerminalBalance({
  projectId,
}: {
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);

  const { loading, data, error, actions } = useHookState<DataType>();

  const getBalance = useCallback(
    async (projectId: ProjectId) => {
      const terminals = await getJBDirectory(provider).terminalsOf(projectId);
      const primaryTerminal = terminals[0];

      const balance = await getJBSingleTokenPaymentTerminalStore(
        provider,
      ).balanceOf(primaryTerminal, projectId);

      return balance;
    },
    [provider],
  );

  React.useEffect(() => {
    actions.setLoading(true);

    getBalance(projectId)
      .then(balance => {
        actions.setLoading(false);
        actions.setData(balance);
      })
      .catch(e => {
        actions.setError(e);
      });
  }, [projectId, actions, provider, getBalance]);

  return { loading, data, error };
}
