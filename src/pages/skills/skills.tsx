import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useBreadcrumbs } from "@/helpers/breadcrumbs";
import { routes } from "@/router";
import { SkillsList } from "@/modules/skills/";

const Skills = () => {
    const { t } = useTranslation();

    const items = useMemo(
        () => [{ title: t("Home"), href: routes.root }, { title: t("Skills") }],
        [t]
    );

    useBreadcrumbs(items);

    return <SkillsList />;
};

export default Skills;
