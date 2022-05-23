import { BigNumber } from '@ethersproject/bignumber';

export type FundingCycleData = {
  duration: BigNumber;
  weight: BigNumber;
  discountRate: BigNumber;
  ballot: string; // hex, contract address
};

export type FundingCycleGlobalMetadata = {
  allowSetController: boolean;
  allowSetTerminals: boolean;
};

export type FundingCycleMetadata = {
  version?: number;
  global: FundingCycleGlobalMetadata;
  reservedRate: BigNumber;
  redemptionRate: BigNumber;
  ballotRedemptionRate: BigNumber;
  pausePay: boolean;
  pauseDistributions: boolean;
  pauseRedeem: boolean;
  pauseBurn: boolean;
  allowMinting: boolean;
  allowChangeToken: boolean;
  allowTerminalMigration: boolean;
  allowControllerMigration: boolean;
  holdFees: boolean;
  useTotalOverflowForRedemptions: boolean;
  useDataSourceForPay: boolean;
  useDataSourceForRedeem: boolean;
  dataSource: string; // hex, contract address
};
