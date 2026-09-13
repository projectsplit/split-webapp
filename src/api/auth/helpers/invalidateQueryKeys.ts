import { QueryClient } from '@tanstack/react-query';

export const invalidateQueryKeys = async (
  queryClient: QueryClient,
  keys: string[]
) => {
  for (const key of keys) {
    await queryClient.invalidateQueries({ queryKey: [key], exact: false });
  }
};
