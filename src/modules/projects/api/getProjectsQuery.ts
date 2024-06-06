import { gql, useQuery } from "@apollo/client";
import { ProjectsResult } from "./projects.types";

export const PROJECTS_QUERY = gql`
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

export const useProjects = () => {
    const query = useQuery<ProjectsResult>(PROJECTS_QUERY);
    return { projects: query.data?.projects ?? [], ...query };
};
