import { useTranslation } from "react-i18next";
import { useGenericBreadcrumbs } from "@/hooks";
import { SkillsList } from "@/modules/skills/";

const Skills = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Skills"));

    return <SkillsList />;
};

export default Skills;
