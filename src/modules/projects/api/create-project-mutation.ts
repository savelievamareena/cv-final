import { gql, useMutation } from "@apollo/client";
import { CreateProjectInput } from "cv-graphql";
import { GET_PROJECTS_QUERY } from "./get-projects-query";
import { CreateProjectResult } from "./projects.types";

export const CREATE_PROJECT = gql`
    mutation CreateProject($project: CreateProjectInput!) {
        createProject(project: $project) {
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

export const useProjectCreate = () => {
    return useMutation<CreateProjectResult, { project: CreateProjectInput }>(CREATE_PROJECT, {
        refetchQueries: [GET_PROJECTS_QUERY],
    });
};
