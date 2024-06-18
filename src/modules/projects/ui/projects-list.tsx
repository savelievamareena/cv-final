import { Project } from "cv-graphql";
import { t } from "i18next";
import ListTemplate from "@/components/list-lemplate/list-template";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useConfirm } from "@/components/confirm-dialog/";
import { useProjectCreate, useProjectDelete, useProjectUpdate } from "../api";
import { useProjectDialog } from "./projects-dialog";
import { useProjectsQuery } from "../api/get-projects-query";

const columnConfigs: ColumnConfig<Project>[] = [
    { name: "name", isSorted: true },
    { name: "internal_name", isSorted: true },
    { name: "domain", isSorted: true },
    { name: "start_date", isSorted: true },
    { name: "end_date", isSorted: true },
    { name: "team_size", isSorted: false },
];

const ProjectsList = () => {
    const { projects, loading } = useProjectsQuery();
    const [openConfirm] = useConfirm();

    const [openProjectDialog] = useProjectDialog();
    const [createProject] = useProjectCreate();
    const [deleteProject] = useProjectDelete();
    const [updateProject] = useProjectUpdate();

    const menuProps: Action = {
        onDelete: (id: string) =>
            openConfirm({
                title: t("delete confirmation"),
                onConfirm: () => void deleteProject({ variables: { project: { projectId: id } } }),
            }),

        onUpdate: (id: string) =>
            openProjectDialog({
                title: t("projects.updateProject"),
                onConfirm: (formData) =>
                    void updateProject({
                        variables: {
                            project: {
                                name: formData.project,
                                projectId: id,
                            },
                        },
                    }),
                initialValues: {
                    project: projects.find((project) => project.id === id)?.name ?? "",
                },
            }),
    };

    const openProject = () =>
        openProjectDialog({
            title: t("projects.addProject"),
            onConfirm: (formData) =>
                void createProject({
                    variables: {
                        project: {
                            name: formData.project,
                        },
                    },
                }),
            initialValues: { project: "" },
        });

    return (
        <ListTemplate
            pageName={t("projects.projects")}
            onButtonClick={openProject}
            menuProps={menuProps}
            columnConfigs={columnConfigs}
            displayData={projects}
            loading={loading}
        />
    );
};

export default ProjectsList;
