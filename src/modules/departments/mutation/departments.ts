import { useMutation, useQuery } from "@apollo/client";
import {
    CreateDepartmentInput,
    DeleteDepartmentInput,
    Department,
    UpdateDepartmentInput,
} from "cv-graphql";
import { CREATE_DEPARTMENT, DELETE_DEPARTMENT, DEPARTMENTS, UPDATE_DEPARTMENT } from "../api";
import { CreateDepartmentResult, DepartmentsResult } from "../api/departments.types";

export const useDepartments = () => {
    const query = useQuery<DepartmentsResult>(DEPARTMENTS);

    return { departments: query.data?.departments ?? [], ...query };
};

export const useDepartmentCreate = () => {
    return useMutation<CreateDepartmentResult, { department: CreateDepartmentInput }>(
        CREATE_DEPARTMENT,
        {
            refetchQueries: [DEPARTMENTS],
        },
    );
};
export const useDepartmentDelete = () => {
    return useMutation<null, { department: DeleteDepartmentInput }>(DELETE_DEPARTMENT, {
        refetchQueries: [DEPARTMENTS],
    });
};

export const useDepartmentUpdate = () => {
    return useMutation<Department, { department: UpdateDepartmentInput }>(UPDATE_DEPARTMENT, {
        refetchQueries: [DEPARTMENTS],
    });
};
