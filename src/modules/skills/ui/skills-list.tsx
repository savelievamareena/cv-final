import { Skill } from "cv-graphql";
import { t } from "i18next";
import { useConfirm } from "@/components/confirm-dialog/";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ListTemplate } from "@/components/list-lemplate/list-template";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useSkillCreate, useSkillDelete, useSkillsQuery, useSkillUpdate } from "../api";
import { useSkillDialog } from "./skills-dialog";

const columnConfigs: ColumnConfig<Skill>[] = [
    { name: "name", isSorted: true },
    { name: "category", isSorted: true },
];

const SkillsList = () => {
    const { skills, loading } = useSkillsQuery();

    const [openConfirm] = useConfirm();
    const [openSkillDialog] = useSkillDialog();
    const [createSkill] = useSkillCreate();
    const [deleteSkill] = useSkillDelete();
    const [updateSkill] = useSkillUpdate();

    const menuProps: Action = {
        onDelete: (id: string) =>
            openConfirm({
                title: t("deleteConfirmation"),
                onConfirm: () => void deleteSkill({ variables: { skill: { skillId: id } } }),
            }),

        onUpdate: (id: string) =>
            openSkillDialog({
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
        openSkillDialog({
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
