import { gql, useMutation } from "@apollo/client";
import { UpdateDepartmentInput } from "cv-graphql";
import { GET_DEPARTMENTS_QUERY } from "@/api";
import { UpdateDepartmentResult } from "./departments.types";

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
            refetchQueries: [GET_DEPARTMENTS_QUERY],
        }
    );
};
