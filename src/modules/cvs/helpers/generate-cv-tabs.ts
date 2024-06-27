import { PageTabItem } from "@/components/page-tabs";
import i18n from "@/i18n";
import { routes } from "@/router";

export const generateCvTabs = (cvId?: string) => {
    const tabItems = cvId
        ? [
              {
                  path: routes.cvs.details(cvId),
                  label: i18n.t("cv.tabLabels.details"),
              },
              {
                  path: routes.cvs.skills(cvId),
                  label: i18n.t("cv.tabLabels.skills"),
              },
              {
                  path: routes.cvs.projects(cvId),
                  label: i18n.t("cv.tabLabels.projects"),
              },
              {
                  path: routes.cvs.preview(cvId),
                  label: i18n.t("cv.tabLabels.preview"),
              },
          ]
        : [];

    return tabItems as PageTabItem[];
};
