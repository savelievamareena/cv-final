import { gql, useMutation } from "@apollo/client";
import { DeleteDepartmentInput } from "cv-graphql";
import { DEPARTMENTS_QUERY } from "./getDepartmentsQuery";

export const DELETE_DEPARTMENT = gql`
    mutation DeleteDepartment($department: DeleteDepartmentInput!) {
        deleteDepartment(department: $department) {
            affected
        }
    }
`;

export const useDepartmentDelete = () => {
    return useMutation<null, { department: DeleteDepartmentInput }>(DELETE_DEPARTMENT, {
        refetchQueries: [DEPARTMENTS_QUERY],
    });
};
