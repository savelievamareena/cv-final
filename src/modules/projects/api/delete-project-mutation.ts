import { gql, useMutation } from "@apollo/client";
import { GET_PROJECTS_QUERY } from "./get-projects-query";

export const DELETE_PROJECT = gql`
    mutation DeleteProject($project: DeleteProjectInput!) {
        deleteProject(project: $project) {
            affected
        }
    }
`;

export const useProjectDelete = () => {
    return useMutation(DELETE_PROJECT, {
        refetchQueries: [GET_PROJECTS_QUERY],
    });
};
