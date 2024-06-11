import { gql, useQuery } from "@apollo/client";
import { Department } from "cv-graphql";
import { useNotificationContext } from "@/helpers/notification";

const GET_DEPARTMENTS_QUERY = gql`
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

export const useDepartmentsQuery = () => {
    const { showNotification } = useNotificationContext();

    return useQuery<DepartmentsResult>(GET_DEPARTMENTS_QUERY, {
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
