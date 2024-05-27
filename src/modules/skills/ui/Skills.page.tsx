import { useState } from "react";
import { Skill } from "cv-graphql";
import { t } from "i18next";
import PageTemplate from "@/components/pageTemplate/page-template";
import { Action } from "@/components/pageTemplate/actions-menu";
import { ColumnConfig } from "@/components/pageTemplate/table-template";
import { useSkills } from "../mutation/skills";

const SkillsPage = () => {
    const { skills, loading } = useSkills();
    const [searchQuery, setSearchQuery] = useState("");

    const menuProps: Action[] = [
        {
            title: "delete",
            onClick: () => console.log("delete"),
        },
        {
            title: "update",
            onClick: () => console.log("update"),
        },
        {
            title: "view",
            onClick: () => console.log("view"),
        },
    ];

    const columnConfigs: ColumnConfig<Skill>[] = [
        { name: "name", isSorted: true },
        { name: "category", isSorted: true },
    ];
    return (
        <PageTemplate
            pageTitle={t("Add skill")}
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

export default SkillsPage;
