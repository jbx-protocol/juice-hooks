import { useState } from 'react';
import { ContractReadHookResponse } from 'types';

type HookStateActions<T> = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<T>>;
  setError: React.Dispatch<React.SetStateAction<Error>>;
};

export default function useHookState<T>(
  defaultData?: T,
): ContractReadHookResponse<T> & {
  actions: HookStateActions<T>;
} {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>(defaultData);
  const [error, setError] = useState<Error>();

  return { loading, data, error, actions: { setLoading, setData, setError } };
}
