import { gql, useMutation } from "@apollo/client";
import { CreateDepartmentInput } from "cv-graphql";
import { CreateDepartmentResult } from "./departments.types";
import { GET_DEPARTMENTS_QUERY } from "./get-departments-query";

export const CREATE_DEPARTMENT = gql`
    mutation CreateDepartment($department: CreateDepartmentInput!) {
        createDepartment(department: $department) {
            id
            name
        }
    }
`;

export const useDepartmentCreate = () => {
    return useMutation<CreateDepartmentResult, { department: CreateDepartmentInput }>(
        CREATE_DEPARTMENT,
        {
            refetchQueries: [GET_DEPARTMENTS_QUERY],
        }
    );
};
