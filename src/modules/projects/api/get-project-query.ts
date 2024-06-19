import { gql, useQuery } from "@apollo/client";
import { ProjectResult, QueryArgs } from "./projects.types";

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

export const useProjectQuery = ({ projectId }: QueryArgs) => {
    const query = useQuery<ProjectResult, QueryArgs>(GET_PROJECT_QUERY, {
        variables: {
            projectId,
        },
    });

    return { project: query.data?.project ?? null, ...query };
};
