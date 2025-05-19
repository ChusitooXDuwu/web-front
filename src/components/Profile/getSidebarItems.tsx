import { IntlShape } from "react-intl";

export const GetSidebarItems = (
  isOwner: boolean,
  page: string,
  formatMessage: IntlShape["formatMessage"]
) => {
  const profileBasePath = "/profile";

  const baseItems = [
    {
      label: formatMessage({ id: "profile.sidebar.history" }),
      path: `${profileBasePath}/history`,
      id: "history",
    },
  ];
  const ownerItems = isOwner
    ? [
        {
          label: formatMessage({ id: "profile.sidebar.myprofile" }),
          path: "/profile",
          id: "profile",
        },
        {
          label: formatMessage({ id: "profile.sidebar.notification" }),
          path: `${profileBasePath}/notifications`,
          id: "notifications",
        },
        {
          label: formatMessage({ id: "profile.sidebar.stats.mine" }),
          path: `${profileBasePath}/statistics`,
          id: "statistics",
        },
      ]
    : [
        {
          label: formatMessage({ id: "profile.sidebar.stats.not.mine" }),
          path: `${profileBasePath}/statistics`,
          id: "statistics",
        },
        {
          label: formatMessage({ id: "profile.sidebar.profile" }),
          path: "/profile",
          id: "profile",
        },
      ];

  let sidebarItems = [...ownerItems, ...baseItems];
  const sidebarItemsAct = sidebarItems.map((item) => ({
    ...item,
    enabled: item.id.includes(page) ? false : true,
  }));
  return sidebarItemsAct;
};
