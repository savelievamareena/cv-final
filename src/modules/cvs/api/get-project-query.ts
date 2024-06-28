import { gql, useQuery } from "@apollo/client";
import { Project } from "cv-graphql";

export interface ProjectResult {
    project: Project;
}

export const GET_PROJECT_QUERY = gql`
    query Project($projectId: ID!) {
        project(projectId: $projectId) {
            id
            name
            internal_name
            domain
            description
            start_date
            end_date
            team_size
        }
    }
`;

export const useProjectQuery = (variables: { projectId: string }) => {
    const query = useQuery<ProjectResult>(GET_PROJECT_QUERY, { variables });
    return { project: query.data?.project ?? [], ...query };
};
