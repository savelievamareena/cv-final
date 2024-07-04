import { gql, useMutation } from "@apollo/client";
import { UpdateProjectInput } from "cv-graphql";
import { useParams } from "react-router-dom";
import { useNotificationContext } from "@/helpers/notification";
import { RouteParams } from "@/router";
import { GET_PROJECT_QUERY } from "./get-project-query";
import { GET_PROJECTS_QUERY } from "./get-projects-query";
import { UpdateProjectResult } from "./projects.types";

export const UPDATE_PROJECT = gql`
    mutation UpdateProject($project: UpdateProjectInput!) {
        updateProject(project: $project) {
            id
            name
            internal_name
            description
            domain
            start_date
            end_date
            team_size
        }
    }
`;

export const useProjectUpdate = () => {
    const { [RouteParams.ProjectId]: projectId } = useParams();

    const { showNotification } = useNotificationContext();

    return useMutation<UpdateProjectResult, { project: UpdateProjectInput }>(UPDATE_PROJECT, {
        refetchQueries: [
            GET_PROJECTS_QUERY,
            { query: GET_PROJECT_QUERY, variables: { projectId } },
        ],
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
