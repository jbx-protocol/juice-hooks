export type ContractReadHookResponse<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

export type ProjectId = number;
