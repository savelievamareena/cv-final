import { gql, useMutation } from "@apollo/client";
import { UpdateProjectInput } from "cv-graphql";
import { UpdateProjectResult } from "./projects.types";
import { PROJECTS_QUERY } from "./getProjectsQuery";

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
    return useMutation<UpdateProjectResult, { project: UpdateProjectInput }>(UPDATE_PROJECT, {
        refetchQueries: [PROJECTS_QUERY],
    });
};
