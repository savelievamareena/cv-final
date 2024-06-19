import { useTranslation } from "react-i18next";
import { SkillsList } from "@/modules/skills/";
import { useGenericBreadcrumbs } from "@/hooks";

const Skills = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Skills"));

    return <SkillsList />;
};

export default Skills;
