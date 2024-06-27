import { Project } from "cv-graphql";
import dayjs from "dayjs";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useConfirm } from "@/components/confirm-dialog/";
import { Action } from "@/components/list-lemplate/actions-menu";
import ListTemplate from "@/components/list-lemplate/list-template";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { DATE_FORMAT } from "@/constants";
import { RouteParams, routes } from "@/router";
import { useCvById } from "../api";
import { useProjectsQuery } from "../api/get-projects-query";
import { useProjectCvRemove } from "../api/remove-cv-project-mutation";
import { useProjectDialog } from "./project-dialog";

const columnConfigs: ColumnConfig<Project>[] = [
    { name: "name", isSorted: true },
    { name: "internal_name", isSorted: true },
    { name: "domain", isSorted: true },
    { name: "start_date", isSorted: true },
    { name: "end_date", isSorted: true },
    { name: "team_size", isSorted: false },
];

const CvProjectsList = () => {
    const { [RouteParams.CvId]: cvId } = useParams();

    const { projects, loading } = useProjectsQuery();
    const { cv } = useCvById(cvId ?? "");

    console.log(cv);

    const navigate = useNavigate();

    const [openConfirm] = useConfirm();

    const [openProjectDialog] = useProjectDialog();
    const [createProject] = useProjectCvRemove();
    const [deleteProject] = useProjectCvRemove();

    const menuProps: Action = {
        onDelete: (id: string) =>
            openConfirm({
                title: t("delete confirmation"),
                onConfirm: () => void deleteProject({ variables: { project: { projectId: id } } }),
            }),
        onUpdate: (id: string) => navigate(routes.projects.details(id)),
    };

    const openProject = () =>
        openProjectDialog({
            title: t("projects.addProject"),
            onConfirm: (formData) => {
                void createProject({
                    variables: {
                        project: {
                            name: formData.name,
                            internal_name: formData.internal_name,
                            team_size: formData.team_size,
                            domain: formData.domain,
                            description: formData.description,
                            start_date: formData.start_date.format(DATE_FORMAT),
                            end_date: formData.end_date?.format(DATE_FORMAT),
                        },
                    },
                });
            },
            initialValues: {
                name: "",
                internal_name: "",
                domain: "",
                description: "",
                team_size: 1,
                start_date: dayjs(),
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

export default CvProjectsList;
