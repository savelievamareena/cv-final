import { Skill } from "cv-graphql";
import { t } from "i18next";
import ListTemplate from "@/components/list-lemplate/list-template";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useConfirm } from "@/components/confirm-dialog/";
import { useSkillCreate, useSkillDelete, useSkillsQuery, useSkillUpdate } from "../api";
import { useAddSkill } from "./skills-dialog";

const columnConfigs: ColumnConfig<Skill>[] = [
    { name: "name", isSorted: true },
    { name: "category", isSorted: true },
];

const SkillsList = () => {
    const { skills, loading } = useSkillsQuery();

    const [openConfirm] = useConfirm();
    const [openAddSkill] = useAddSkill();
    const [createSkill] = useSkillCreate();
    const [deleteSkill] = useSkillDelete();
    const [updateSkill] = useSkillUpdate();

    const menuProps: Action = {
        onDelete: (id: string) =>
            openConfirm({
                title: t("delete confirmation"),
                onConfirm: () => void deleteSkill({ variables: { skill: { skillId: id } } }),
            }),

        onUpdate: (id: string) =>
            openAddSkill({
                title: t("skills.updateSkill"),
                onConfirm: (formData) =>
                    void updateSkill({
                        variables: {
                            skill: {
                                name: formData.skill,
                                category: formData.category,
                                skillId: id,
                            },
                        },
                    }),
                initialValues: {
                    skill: skills.find((skill) => skill.id === id)?.name ?? "",
                    category: skills.find((skill) => skill.id === id)?.category ?? "",
                },
            }),
    };

    const openSkill = () =>
        openAddSkill({
            title: t("skills.addSkill"),
            onConfirm: (formData) =>
                void createSkill({
                    variables: {
                        skill: {
                            name: formData.skill,
                            category: formData.category,
                        },
                    },
                }),
            initialValues: { skill: "", category: "" },
        });

    return (
        <ListTemplate
            pageName={t("skills.skill")}
            onButtonClick={openSkill}
            menuProps={menuProps}
            columnConfigs={columnConfigs}
            displayData={skills}
            loading={loading}
        />
    );
};

export default SkillsList;
