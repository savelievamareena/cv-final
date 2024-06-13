import { useBreadcrumbs } from "@/helpers/breadcrumbs";
import SkillsList from "@/modules/skills/ui/skills-list";
import { routes } from "@/router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Skills = () => {
    const { t } = useTranslation();

    const items = useMemo(
        () => [
            { title: t("Home"), href: routes.root },
            { title: t("Skills"), href: routes.departments },
        ],
        [t]
    );

    useBreadcrumbs(items);

    return <SkillsList />;
};

export default Skills;
