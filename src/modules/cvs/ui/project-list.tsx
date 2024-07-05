import { CvProject } from "cv-graphql";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useConfirm } from "@/components/confirm-dialog/";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ListTemplate } from "@/components/list-lemplate/list-template";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { DATE_FORMAT } from "@/constants";
import { RouteParams, routes } from "@/router";
import { useCvProjectAdd } from "../api/add-cv-project-mutation";
import { useCvProjects } from "../api/get-cv-projects-query";
import { useProjectsQuery } from "../api/get-projects-query";
import { useProjectCvRemove } from "../api/remove-cv-project-mutation";
import { useProjectDialog } from "./project-dialog";

const columnConfigs: ColumnConfig<CvProject>[] = [
    { name: "name", isSorted: true },
    { name: "internal_name", isSorted: true },
    { name: "domain", isSorted: true },
    { name: "start_date", isSorted: true },
    { name: "end_date", isSorted: true },
];

const CvProjectsList = () => {
    const { t } = useTranslation();

    const { [RouteParams.CvId]: cvId } = useParams();

    const { projects, loading } = useCvProjects(cvId ?? "");
    const { projectsList } = useProjectsQuery();

    const navigate = useNavigate();

    const [openConfirm] = useConfirm();

    const [openProjectDialog] = useProjectDialog();
    const [createProject] = useCvProjectAdd();
    const [deleteProject] = useProjectCvRemove(cvId ?? "");

    const menuProps: Action = {
        onDelete: (id: string) => {
            openConfirm({
                title: t("deleteConfirmation"),
                onConfirm: () => {
                    const project = projects.find((proj) => proj.id === id);
                    console.log(project?.project.id);
                    return void deleteProject({
                        variables: {
                            project: {
                                projectId: project?.project.id ?? "",
                                cvId: cvId ?? "",
                            },
                        },
                    });
                },
            });
        },
        onUpdate: (__id: string, name?: string) => {
            const cvId = projectsList?.filter((projects) => projects.name == name)[0].id;
            navigate(routes.projects.details(cvId));
        },
    };

    const openProject = () =>
        openProjectDialog({
            projects: projectsList,
            title: t("projects.addProject"),
            onConfirm: (formData) => {
                const id = projectsList?.filter((projects) => projects.name === formData.name);

                void createProject({
                    variables: {
                        project: {
                            cvId: cvId ?? "",
                            projectId: id[0].id,
                            start_date: formData.start_date.format(DATE_FORMAT),
                            end_date: formData.end_date?.format(DATE_FORMAT),
                            responsibilities: [formData.responsibilities ?? ""],
                            roles: [formData.responsibilities ?? ""],
                        },
                    },
                });
            },
            initialValues: {
                name: "",
                responsibilities: "",
                roles: "",
                start_date: dayjs(),
            },
        });

    return (
        <ListTemplate
            pageName={t("projects.cvprojects")}
            onButtonClick={openProject}
            menuProps={menuProps}
            columnConfigs={columnConfigs}
            displayData={projects}
            loading={loading}
        />
    );
};

export default CvProjectsList;
