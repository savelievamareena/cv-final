import { useSkills } from "../mutation/skills";
import { useState } from "react";
import { Skill } from "cv-graphql";
import PageTemplate from "@/components/pageTemplate/PageTemplate";
import { Action } from "@/components/pageTemplate/ActionsMenu";
import { t } from "i18next";

const SkillsPage = () => {
    const { skills, loading } = useSkills();
    const [searchQuery, setSearchQuery] = useState("");

    const menuProps: Action[] = [
        {
            tittle: "delete",
            onClick: () => console.log("delete"),
        },
        {
            tittle: "update",
            onClick: () => console.log("update"),
        },
        {
            tittle: "view",
            onClick: () => console.log("view"),
        },
    ];

    const columnNames: (keyof Skill)[] = ["name", "category"];
    return (
        <PageTemplate
            pageTitle={t("Add skill")}
            onButtonClick={() => console.log(12)}
            menuProps={menuProps}
            columnNames={columnNames}
            searchQuery={searchQuery}
            displayData={skills}
            loading={loading}
            setSearchQuery={setSearchQuery}
        />
    );
};

export default SkillsPage;
