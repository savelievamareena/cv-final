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

export const useDepartmentDelete = (departmentId: string) => {
    return useMutation<null, { department: DeleteDepartmentInput }>(DELETE_DEPARTMENT, {
        variables: {
            department: { departmentId },
        },
        refetchQueries: [DEPARTMENTS_QUERY],
    });
};
