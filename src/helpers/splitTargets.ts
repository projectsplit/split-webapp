import { apiClient } from '@/api/apiClients';
import {
  GetConnectionStatusesResponse,
  GetGroupsResponse,
  Group,
  SearchUserResponse,
} from '@/types';
import { Person } from './expenseSplit';
import { getSignedInUserId } from './isUserAuthenticated';

/**
 * The groups an expense can be split in: all of the person's groups but the archived ones, which
 * take no new expenses. Fails without a connection, for the caller to fall back on what it has.
 */
export const loadSplitGroups = async (): Promise<Group[]> => {
  const { data } = await apiClient.get<GetGroupsResponse>('/groups/search', {
    params: { keyword: '', pageSize: 100 },
  });

  return data.groups.filter((group) => !group.isArchived);
};

/**
 * The people an expense can be quick-split with: everyone the person is connected to. The user
 * search lists connections first when given no keyword, then tops the page up with other users, so
 * their connection statuses sort the two apart. Fifty is more connections than anyone splits with in
 * practice.
 */
export const loadSplitPeople = async (): Promise<Person[]> => {
  const { data } = await apiClient.get<SearchUserResponse>(
    '/users/search-all-users',
    { params: { pageSize: 50 } }
  );

  const me = getSignedInUserId();
  const users = data.users.filter((user) => user.userId !== me);
  if (users.length === 0) return [];

  const params = new URLSearchParams();
  users.forEach((user) => params.append('userIds', user.userId));

  const { data: connections } =
    await apiClient.get<GetConnectionStatusesResponse>(
      '/connections/statuses',
      { params }
    );

  const connected = new Set(
    connections.statuses
      .filter((x) => x.status === 'connected')
      .map((x) => x.userId)
  );

  return users
    .filter((user) => connected.has(user.userId))
    .map(({ userId, username }) => ({ userId, username }));
};
