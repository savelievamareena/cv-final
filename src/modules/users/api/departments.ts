import { gql, useQuery } from "@apollo/client";
import { Department } from "cv-graphql";

const DEPARTMENTS = gql`
    query Departments {
        departments {
            id
            name
        }
    }
`;

interface DepartmentsResult {
    departments: Department[];
}

export const useDepartments = () => {
    return useQuery<DepartmentsResult>(DEPARTMENTS, {
        onError: (error) => {
            console.error(error.message);
        },
    });
};
