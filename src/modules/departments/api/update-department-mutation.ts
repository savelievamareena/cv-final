import { gql, useMutation } from "@apollo/client";
import { UpdateDepartmentInput } from "cv-graphql";
import { UpdateDepartmentResult } from "./departments.types";
import { DEPARTMENTS_QUERY } from "./get-departments-query";

export const UPDATE_DEPARTMENT = gql`
    mutation UpdateDepartment($department: UpdateDepartmentInput!) {
        updateDepartment(department: $department) {
            id
            name
        }
    }
`;
export const useDepartmentUpdate = () => {
    return useMutation<UpdateDepartmentResult, { department: UpdateDepartmentInput }>(
        UPDATE_DEPARTMENT,
        {
            refetchQueries: [DEPARTMENTS_QUERY],
        }
    );
};
