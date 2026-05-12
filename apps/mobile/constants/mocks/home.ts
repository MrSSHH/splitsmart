// mocks/home.mock.ts

export enum Currency {
  ILS = "₪",
}

export enum ActivityType {
  EXPENSE_ADDED = "EXPENSE_ADDED",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  GROUP_EXPENSE = "GROUP_EXPENSE",
}

export enum DebtStatus {
  YOU_OWE = "YOU_OWE",
  OWED_TO_YOU = "OWED_TO_YOU",
  SETTLED = "SETTLED",
}

export const homeMock = {
  greeting: "Good evening",
  user: {
    firstName: "Ben",
    profileImage: null,
    notifications: 1,
  },

  currency: Currency.ILS,

  balance: {
    owedMoney: 43,
    groupCount: 3,

    peopleOweYou: {
      amount: 85,
      users: [
        {
          id: "1",
          name: "Dana",
          avatar: "https://i.pravatar.cc/150?img=32",
        },
        {
          id: "2",
          name: "Eli",
          avatar: "https://i.pravatar.cc/150?img=12",
        },
        {
          id: "3",
          name: "Noam",
          avatar: "https://i.pravatar.cc/150?img=15",
        },
      ],
    },

    youOwe: {
      amount: 42,
      users: [
        {
          id: "4",
          name: "Maya",
          avatar: "https://i.pravatar.cc/150?img=47",
        },
        {
          id: "5",
          name: "David",
          avatar: "https://i.pravatar.cc/150?img=13",
        },
      ],
    },
  },

  quickActions: [
    {
      id: "1",
      title: "Add expense",
      subtitle: "Split with others",
      icon: "receipt-outline",
    },
    {
      id: "2",
      title: "Settle up",
      subtitle: "Pay or get paid",
      icon: "cash-outline",
    },
    {
      id: "3",
      title: "New group",
      subtitle: "Create a group",
      icon: "people-outline",
    },
  ],

groups: [
  {
    id: 1,
    groupIcon: "home-outline",
    groupName: "Apartment",
    groupMembersAmt: 4,
    debtStatus: DebtStatus.YOU_OWE,
  },

  {
    id: 2,
    groupIcon: "restaurant-outline",
    groupName: "Lunch Crew",
    groupMembersAmt: 5,
    debtStatus: DebtStatus.OWED_TO_YOU,
  },

  {
    id: 3,
    groupIcon: "airplane-outline",
    groupName: "Trip to Eilat",
    groupMembersAmt: 6,
    debtStatus: DebtStatus.SETTLED,
  },
],
  recentActivity: [
    {
      id: "1",
      type: ActivityType.EXPENSE_ADDED,
      user: "You",
      groupName: "Apartment",
      description: "You added ₪120 for dinner",
      amount: -120,
      timeAgo: "2h ago",
      avatar: "https://i.pravatar.cc/150?img=12",
    },

    {
      id: "2",
      type: ActivityType.PAYMENT_RECEIVED,
      user: "Dana",
      groupName: "Lunch Crew",
      description: "Dana paid you",
      amount: 40,
      timeAgo: "5h ago",
      avatar: "https://i.pravatar.cc/150?img=32",
    },

    {
      id: "3",
      type: ActivityType.GROUP_EXPENSE,
      user: "Eli",
      groupName: "Apartment",
      description: "New expense added in Apartment",
      amount: -60,
      timeAgo: "1d ago",
      avatar: null,
    },
  ],
};
