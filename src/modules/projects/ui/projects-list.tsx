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
                                projectId: id,
                                name: formData.name,
                                internal_name: formData.internalName,
                                team_size: formData.teamSize,
                                domain: formData.domain,
                                description: formData.description,
                                start_date: formData.startDate,
                                end_date: formData.endDate,
                            },
                        },
                    }),
                initialValues: {
                    name: projects.find((project) => project.id === id)?.name ?? "",
                    internalName:
                        projects.find((project) => project.id === id)?.internal_name ?? "",
                    domain: projects.find((project) => project.id === id)?.domain ?? "",
                    description: projects.find((project) => project.id === id)?.description ?? "",
                    startDate: projects.find((project) => project.id === id)?.start_date ?? "",
                    endDate: projects.find((project) => project.id === id)?.end_date ?? "",
                    teamSize: projects.find((project) => project.id === id)?.team_size ?? 0,
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
                            name: formData.name,
                            internal_name: formData.internalName,
                            team_size: formData.teamSize,
                            domain: formData.domain,
                            description: formData.description,
                            start_date: formData.startDate,
                            end_date: formData.endDate,
                        },
                    },
                }),
            initialValues: {
                name: "",
                internalName: "",
                domain: "",
                description: "",
                teamSize: 1,
                startDate: "",
                endDate: "",
            },
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
