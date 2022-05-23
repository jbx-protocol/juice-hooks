import { useContext, useEffect } from 'react';
import { getJBController } from 'juice-sdk';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractReadHookResponse, ProjectId } from 'types';

import { JuiceContext } from '../../../contexts/JuiceContext';
import useHookState from '../../useHookState';

export const ETH_TOKEN_ADDRESS = '0x000000000000000000000000000000000000eeee';

type DataType = {
  distributionLimit: BigNumber;
  distributionLimitCurrency: BigNumber;
};

export default function useProjectTerminalDistributionLimit({
  projectId,
  configuration,
  terminalAddress,
}: {
  projectId: ProjectId;
  configuration: string;
  terminalAddress: string;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBController(provider)
      .distributionLimitOf(
        projectId,
        configuration,
        terminalAddress,
        ETH_TOKEN_ADDRESS,
      )
      .then(data => {
        actions.setLoading(false);
        actions.setData({
          distributionLimit: data?.[0],
          distributionLimitCurrency: data?.[1],
        });
      })
      .catch(e => {
        actions.setError(e);
      });
  }, [projectId, configuration, terminalAddress, actions, provider]);

  return { loading, data, error };
}
