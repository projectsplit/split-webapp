import {
  GROUP_EXPENSE,
  GROUP_EXPENSE_ID,
  GROUP_ID,
  GROUP_NAME,
  GUEST_MEMBER_ID,
  GUEST_NAME,
  JO_ID,
  ME_ID,
  MY_MEMBER_ID,
  QUICK_SPLIT_EXPENSE,
  QUICK_SPLIT_EXPENSE_ID,
  RECURRING_EXPENSE,
  SAM_ID,
} from './constants';

const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 3_600_000).toISOString();
const daysAhead = (days: number) =>
  new Date(Date.now() + days * 86_400_000).toISOString();

export const createMockData = () => {
  const created = hoursAgo(48);

  const me = {
    userId: ME_ID,
    username: 'alex',
    email: 'alex@example.test',
    emailVerified: true,
    hasNewerNotifications: false,
    currency: 'EUR',
    timeZone: 'Europe/Athens',
    timeZoneCoordinates: { latitude: 37.98, longitude: 23.73 },
    showBudgetInfo: true,
    recentContextId: 'NON_GROUP',
    pushNotificationsEnabled: false,
  };

  const members = [
    { id: MY_MEMBER_ID, userId: ME_ID, name: 'alex', joined: created },
  ];
  const guests = [{ id: GUEST_MEMBER_ID, name: GUEST_NAME, joined: created }];

  const group = {
    id: GROUP_ID,
    name: GROUP_NAME,
    created,
    updated: created,
    ownerId: ME_ID,
    currency: 'EUR',
    isArchived: false,
    isDeleted: false,
    members,
    guests: guests.map((g) => ({ ...g, canBeRemoved: false })),
    labels: [],
  };

  const groupExpense = {
    id: GROUP_EXPENSE_ID,
    groupId: GROUP_ID,
    amount: 12,
    currency: 'EUR',
    description: GROUP_EXPENSE,
    labels: [],
    location: null,
    occurred: hoursAgo(3),
    created: hoursAgo(3),
    updated: hoursAgo(3),
    creatorId: ME_ID,
    payments: [{ memberId: MY_MEMBER_ID, amount: 12 }],
    shares: [
      { memberId: MY_MEMBER_ID, amount: 6 },
      { memberId: GUEST_MEMBER_ID, amount: 6 },
    ],
    recurringExpenseId: null,
    transactionType: 1,
  };

  const quickSplitExpense = {
    id: QUICK_SPLIT_EXPENSE_ID,
    amount: 20,
    currency: 'EUR',
    description: QUICK_SPLIT_EXPENSE,
    labels: [],
    location: null,
    occurred: hoursAgo(2),
    created: hoursAgo(2),
    updated: hoursAgo(2),
    creatorId: ME_ID,
    payments: [{ userId: ME_ID, username: 'alex', amount: 20 }],
    shares: [
      { userId: ME_ID, username: 'alex', amount: 10 },
      { userId: SAM_ID, username: 'sam', amount: 10 },
    ],
    recurringExpenseId: null,
    transactionType: 2,
  };

  const quickSplitTransfer = {
    id: '40000000-0000-4000-8000-000000000001',
    amount: 5,
    currency: 'EUR',
    description: 'Coffee money',
    occurred: hoursAgo(5),
    created: hoursAgo(5),
    updated: hoursAgo(5),
    creatorId: ME_ID,
    senderId: SAM_ID,
    receiverId: ME_ID,
  };

  const recurringExpense = {
    id: '50000000-0000-4000-8000-000000000001',
    amount: 30,
    anchorDate: daysAhead(10),
    created,
    updated: created,
    currency: 'EUR',
    description: RECURRING_EXPENSE,
    groupId: null,
    groupName: null,
    isPaused: false,
    labels: [],
    lastError: null,
    lastExpenseCreated: null,
    lastExpenseId: null,
    lastExpenseOccurred: null,
    lastRunAt: null,
    location: null,
    nextOccurrence: daysAhead(10),
    nonGroupPayments: null,
    nonGroupShares: null,
    payments: null,
    shares: null,
    schedule: {
      frequency: 3,
      dayOfMonth: 11,
      dayOfWeek: null,
      month: null,
      hour: 9,
      minute: 0,
    },
    timeZoneId: 'Europe/Athens',
    transactionType: 0,
  };

  const personalShares = [
    {
      ...groupExpense,
      id: '30000000-0000-4000-8000-000000000011',
      amount: 6,
    },
    {
      ...quickSplitExpense,
      id: '30000000-0000-4000-8000-000000000012',
      amount: 10,
    },
  ];

  const perPerson = (ids: string[], amount: number) =>
    Object.fromEntries(ids.map((id) => [id, amount]));
  const perPersonByCurrency = (ids: string[], amount: number) =>
    Object.fromEntries(ids.map((id) => [id, amount ? { EUR: amount } : {}]));

  return {
    me,
    users: {
      sam: { userId: SAM_ID, username: 'sam' },
      jo: { userId: JO_ID, username: 'jo' },
    },
    group,
    groupSearchItem: { ...group, guests },
    groupDetails: {
      id: GROUP_ID,
      name: GROUP_NAME,
      currency: 'EUR',
      isArchived: false,
      details: { EUR: 6 },
      convertedBalance: 6,
    },
    allBalances: { balances: { EUR: 6 }, groupCount: 1, convertedBalance: 6 },
    groupExpenses: [groupExpense],
    groupTransfers: [] as unknown[],
    groupDebts: {
      debts: [
        {
          debtor: GUEST_MEMBER_ID,
          creditor: MY_MEMBER_ID,
          amount: 6,
          currency: 'EUR',
        },
      ],
      totalSpent: perPersonByCurrency([MY_MEMBER_ID, GUEST_MEMBER_ID], 6),
      convertedTotalSpent: perPerson([MY_MEMBER_ID, GUEST_MEMBER_ID], 6),
      totalSent: perPersonByCurrency([MY_MEMBER_ID, GUEST_MEMBER_ID], 0),
      convertedTotalSent: perPerson([MY_MEMBER_ID, GUEST_MEMBER_ID], 0),
      totalReceived: perPersonByCurrency([MY_MEMBER_ID, GUEST_MEMBER_ID], 0),
      convertedTotalReceived: perPerson([MY_MEMBER_ID, GUEST_MEMBER_ID], 0),
    },
    quickSplitExpenses: [quickSplitExpense],
    quickSplitTransfers: [quickSplitTransfer],
    quickSplitDebts: {
      debts: [
        {
          debtor: SAM_ID,
          debtorName: 'sam',
          creditor: ME_ID,
          creditorName: 'alex',
          amount: 5,
          currency: 'EUR',
        },
      ],
      totalSpent: perPersonByCurrency([ME_ID, SAM_ID], 10),
      convertedTotalSpent: perPerson([ME_ID, SAM_ID], 10),
      totalSent: { [SAM_ID]: { EUR: 5 } },
      convertedTotalSent: { [SAM_ID]: 5 },
      totalReceived: { [ME_ID]: { EUR: 5 } },
      convertedTotalReceived: { [ME_ID]: 5 },
    },
    recurringExpenses: [recurringExpense],
    personalExpenses: personalShares,
  };
};

export type MockData = ReturnType<typeof createMockData>;
