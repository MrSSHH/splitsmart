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
      groupDebt: 45,
      currency: Currency.ILS,
      debtStatus: DebtStatus.YOU_OWE,
    },

    {
      id: 2,
      groupIcon: "restaurant-outline",
      groupName: "Lunch Crew",
      groupMembersAmt: 5,
      groupDebt: 25,
      currency: Currency.ILS,

      debtStatus: DebtStatus.OWED_TO_YOU,
    },

    {
      id: 3,
      groupIcon: "airplane-outline",
      groupName: "Trip to Eilat",
      groupMembersAmt: 6,
      groupDebt: 0,
      currency: Currency.ILS,
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
  friendsList: [
    {
      id: "usr_9j2k8a1b",
      name: "Sarah Jenkins",
      phone: "+1 (555) 234-5678",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      id: "usr_3m7x9p4e",
      name: "David Chen",
      phone: "+1 (555) 876-5432",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      id: "usr_5v2l6t8w",
      name: "Amara Diallo",
      phone: "+1 (555) 432-1098",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      id: "usr_8b4q1z7r",
      name: "Marcus Thompson",
      phone: "+1 (555) 345-6789",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      id: "usr_1w9v3n6c",
      name: "Elena Rostova",
      phone: "+1 (555) 765-4321",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      id: "usr_6f8g2y4m",
      name: "Liam Gallagher",
      phone: "+1 (555) 987-6543",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      id: "usr_2t5k7w9x",
      name: "Sofia Rodriguez",
      phone: "+1 (555) 543-2109",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
    },
  ],
};
