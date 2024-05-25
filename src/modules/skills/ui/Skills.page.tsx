import { useSkills } from "../mutation/skills";
import { useState } from "react";
import { Skill } from "cv-graphql";
import PageTemplate from "@/components/pageTemplate/PageTemplate";
import { Action } from "@/components/pageTemplate/ActionsMenu";

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
    ];

    const columnNames: (keyof Skill)[] = ["name", "category"];
    return (
        <PageTemplate
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
