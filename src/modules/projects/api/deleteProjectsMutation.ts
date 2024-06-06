import { gql, useMutation } from "@apollo/client";
import { PROJECTS_QUERY } from "./getProjectsQuery";

export const DELETE_PROJECT = gql`
    mutation DeleteProject($project: DeleteProjectInput!) {
        deleteProject(project: $project) {
            affected
        }
    }
`;

export const useProjectDelete = () => {
    return useMutation(DELETE_PROJECT, {
        refetchQueries: [PROJECTS_QUERY],
    });
};
