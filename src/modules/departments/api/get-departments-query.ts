import { gql, useQuery } from "@apollo/client";
import { DepartmentsResult } from "./departments.types";

export const DEPARTMENTS_QUERY = gql`
    query Departments {
        departments {
            id
            name
        }
    }
`;

export const useDepartmentsQuery = () => {
    const query = useQuery<DepartmentsResult>(DEPARTMENTS_QUERY);

    return { departments: query.data?.departments ?? [], ...query };
};
