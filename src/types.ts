type ContractReadHookResponse<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

type ProjectId = number;
