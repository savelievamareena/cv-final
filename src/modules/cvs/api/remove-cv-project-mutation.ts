import { gql, useMutation } from "@apollo/client";
import { GET_PROJECTS_QUERY } from "./get-projects-query";

export const REMOVE_CV_PROJECT = gql`
    mutation removeCvProject($project: RemoveCvProjectInput!) {
        removeCvProject(project: $project) {
            affected
        }
    }
`;

export const useProjectCvRemove = () => {
    return useMutation(REMOVE_CV_PROJECT, {
        refetchQueries: [GET_PROJECTS_QUERY],
    });
};
