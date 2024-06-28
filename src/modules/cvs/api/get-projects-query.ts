import { gql, useQuery } from "@apollo/client";
import { Project } from "cv-graphql";

export interface ProjectsResult {
    projects: Project[];
}

export const GET_PROJECTS_QUERY = gql`
    query Projects {
        projects {
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

export const useProjectsQuery = () => {
    const query = useQuery<ProjectsResult>(GET_PROJECTS_QUERY);
    return { projects: query.data?.projects ?? [], ...query };
};
