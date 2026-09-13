import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { UserInfo } from '@/types';
import { apiClient } from '@/api/apiClients';

const NOTIFICATION_POLL_INTERVAL_MS = 60_000;

export const useGetMe = () => {
  return useQuery({
    queryKey: ['getMe'],
    queryFn: getMe,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: NOTIFICATION_POLL_INTERVAL_MS,
    refetchIntervalInBackground: false,
  });
};

const getMe = async () => {
  const response = await apiClient.get<void, AxiosResponse<UserInfo>>(
    '/users/me'
  );
  return response.data;
};
