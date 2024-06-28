import { gql, useMutation } from "@apollo/client";
import { RemoveCvProjectInput } from "cv-graphql";
import { RemoveCvProjectResult } from "./cvs.types";

export const REMOVE_CV_PROJECT = gql`
    mutation removeCvProject($project: RemoveCvProjectInput!) {
        removeCvProject(project: $project) {
            affected
        }
    }
`;

export const useProjectCvRemove = () => {
    return useMutation<RemoveCvProjectResult, { project: RemoveCvProjectInput }>(REMOVE_CV_PROJECT);
};
