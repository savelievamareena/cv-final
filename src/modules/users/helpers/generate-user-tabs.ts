import { PageTabItem } from "@/components/page-tabs";
import i18n from "@/i18n";
import { routes } from "@/router";

export const generateUserTabs = (userId?: string) => {
    const tabItems = userId
        ? [
              {
                  path: routes.users.profile(userId),
                  label: i18n.t("user.tabLabels.profile"),
              },
              {
                  path: routes.users.skills(userId),
                  label: i18n.t("user.tabLabels.skills"),
              },
              {
                  path: routes.users.languages(userId),
                  label: i18n.t("user.tabLabels.languages"),
              },
              {
                  path: routes.users.cvs(userId),
                  label: i18n.t("user.tabLabels.cvs"),
              },
          ]
        : [];

    return tabItems as PageTabItem[];
};
