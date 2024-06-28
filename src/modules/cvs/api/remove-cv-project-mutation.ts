import { gql, useMutation } from "@apollo/client";
import { RemoveCvProjectInput } from "cv-graphql";
import { RemoveCvProjectResult } from "./cvs.types";
import { CV_PROJECTS } from "./get-cv-projects-query";

export const REMOVE_CV_PROJECT = gql`
    mutation removeCvProject($project: RemoveCvProjectInput!) {
        removeCvProject(project: $project) {
            name
        }
    }
`;

export const useProjectCvRemove = (id: string) => {
    return useMutation<RemoveCvProjectResult, { project: RemoveCvProjectInput }>(
        REMOVE_CV_PROJECT,
        {
            refetchQueries: [
                {
                    query: CV_PROJECTS,
                    variables: { cvId: id }, // You will set this dynamically in the mutation call
                },
            ],
        }
    );
};
