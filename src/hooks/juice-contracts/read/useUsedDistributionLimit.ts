import { useContext, useEffect } from 'react';
import { getJBSingleTokenPaymentTerminalStore } from 'juice-sdk';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractReadHookResponse, ProjectId } from 'types';

import { JuiceContext } from '../../../contexts/JuiceContext';
import useHookState from '../../useHookState';

type DataType = BigNumber;

export default function useUsedDistributionLimit({
  terminalAddress,
  projectId,
  fundingCycleNumber,
}: {
  terminalAddress: string;
  projectId: ProjectId;
  fundingCycleNumber: BigNumber;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBSingleTokenPaymentTerminalStore(provider)
      .usedDistributionLimitOf(terminalAddress, projectId, fundingCycleNumber)
      .then(usedDistributionLimit => {
        actions.setLoading(false);
        actions.setData(usedDistributionLimit);
      })
      .catch(e => {
        actions.setError(e);
      });
  }, [projectId, terminalAddress, fundingCycleNumber, provider, actions]);

  return { loading, data, error };
}
