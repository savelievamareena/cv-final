import { useState } from "react";
import { Skill } from "cv-graphql";
import { t } from "i18next";
import PageTemplate from "@/components/list-lemplate/list-template";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useSkills } from "@/modules/skills/mutation/skills";

const SkillsList = () => {
    const { skills, loading } = useSkills();
    const [searchQuery, setSearchQuery] = useState("");

    const menuProps: Action = {
        onDelete: () => console.log("delete"),
        onUpdate: () => console.log("update"),
    };
    const columnConfigs: ColumnConfig<Skill>[] = [
        { name: "name", isSorted: true },
        { name: "category", isSorted: true },
    ];
    return (
        <PageTemplate
            pageName={t("Add skill")}
            onButtonClick={() => console.log(12)}
            menuProps={menuProps}
            columnConfigs={columnConfigs}
            searchQuery={searchQuery}
            displayData={skills}
            loading={loading}
            setSearchQuery={setSearchQuery}
        />
    );
};

export default SkillsList;
