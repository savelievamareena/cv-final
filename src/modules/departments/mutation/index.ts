import { useMutation, useQuery } from "@apollo/client";
import { CreateDepartmentInput, DeleteDepartmentInput, UpdateDepartmentInput } from "cv-graphql";
import { DEPARTMENTS, CREATE_DEPARTMENT, UPDATE_DEPARTMENT, DELETE_DEPARTMENT } from "../api";
import {
    CreateDepartmentResult,
    DepartmentsResult,
    UpdateDepartmentResult,
} from "../api/departments.types";

export const useDepartments = () => {
    const query = useQuery<DepartmentsResult>(DEPARTMENTS);

    return { departments: query.data?.departments ?? [], ...query };
};

export const useDepartmentCreate = () => {
    return useMutation<CreateDepartmentResult, { department: CreateDepartmentInput }>(
        CREATE_DEPARTMENT,
        {
            refetchQueries: [DEPARTMENTS],
        }
    );
};

export const useDepartmentUpdate = () => {
    return useMutation<UpdateDepartmentResult, { department: UpdateDepartmentInput }>(
        UPDATE_DEPARTMENT,
        {
            refetchQueries: [DEPARTMENTS],
        }
    );
};

export const useDepartmentDelete = (departmentId: string) => {
    return useMutation<null, { department: DeleteDepartmentInput }>(DELETE_DEPARTMENT, {
        variables: {
            department: { departmentId },
        },
        refetchQueries: [DEPARTMENTS],
    });
};
