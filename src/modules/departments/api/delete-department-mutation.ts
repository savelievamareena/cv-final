import { gql, useMutation } from "@apollo/client";
import { DeleteDepartmentInput } from "cv-graphql";
import { GET_DEPARTMENTS_QUERY } from "@/api";

export const DELETE_DEPARTMENT = gql`
    mutation DeleteDepartment($department: DeleteDepartmentInput!) {
        deleteDepartment(department: $department) {
            affected
        }
    }
`;

export const useDepartmentDelete = () => {
    return useMutation<null, { department: DeleteDepartmentInput }>(DELETE_DEPARTMENT, {
        refetchQueries: [GET_DEPARTMENTS_QUERY],
    });
};
