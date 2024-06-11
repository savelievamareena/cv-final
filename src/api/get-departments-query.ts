import { gql, useQuery } from "@apollo/client";
import { Department } from "cv-graphql";
import { useNotificationContext } from "@/helpers/notification";

export const GET_DEPARTMENTS_QUERY = gql`
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

    const { data, ...query } = useQuery<DepartmentsResult>(GET_DEPARTMENTS_QUERY, {
        onError: (error) => {
            showNotification("error", error.message);
        },
    });

    return { departments: data?.departments ?? [], ...query };
};
