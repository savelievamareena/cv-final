import { gql, useMutation } from "@apollo/client";
import { CreateDepartmentInput } from "cv-graphql";
import { GET_DEPARTMENTS_QUERY } from "@/api";
import { CreateDepartmentResult } from "./departments.types";

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
