import { useContext, useEffect } from 'react';
import { getJBSingleTokenPaymentTerminalStore } from 'juice-sdk';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractReadHookResponse, ProjectId } from 'types';

import { JuiceContext } from '../../../contexts/JuiceContext';
import useHookState from '../../useHookState';
import useWalletTotalTokenBalance from './useWalletTotalTokenBalance';

type DataType = BigNumber;

export default function useTerminalCurrentReclaimableOverflow({
  projectId,
  walletAddress,
  terminalAddress,
}: {
  projectId: ProjectId;
  walletAddress: string;
  terminalAddress: string;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  const { data: totalBalance, loading: totalBalanceLoading } =
    useWalletTotalTokenBalance({ walletAddress, projectId });

  useEffect(() => {
    if (totalBalanceLoading) return;

    actions.setLoading(true);

    getJBSingleTokenPaymentTerminalStore(provider)
      ['currentReclaimableOverflowOf(address,uint256,uint256,bool)'](
        terminalAddress,
        projectId,
        totalBalance,
        false, // _useTotalOverflow (just using 1 terminal for now)
      )
      .then(overflow => {
        actions.setLoading(false);
        actions.setData(overflow);
      })
      .catch(e => {
        actions.setError(e);
      });
  }, [
    projectId,
    walletAddress,
    terminalAddress,
    actions,
    provider,
    totalBalance,
    totalBalanceLoading,
  ]);

  return { loading, data, error };
}
