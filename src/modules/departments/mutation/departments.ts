import { useMutation, useQuery } from "@apollo/client";
import {
    CreateDepartmentInput,
    DeleteDepartmentInput,
    Department,
    UpdateDepartmentInput,
} from "cv-graphql";
import { getQuery, createMutation, deleteMutation, updateMutation } from "../apis/departments";

interface DepartmentsResult {
    departments: Department[];
}

export const useDepartments = () => {
    const query = useQuery<DepartmentsResult>(getQuery);

    return { departments: query.data?.departments ?? [], ...query };
};

export const useDepartmentCreate = () => {
    return useMutation<Department, { department: CreateDepartmentInput }>(createMutation, {
        refetchQueries: [getQuery],
    });
};

export const useDepartmentUpdate = () => {
    return useMutation<Department, { department: UpdateDepartmentInput }>(updateMutation, {
        refetchQueries: [getQuery],
    });
};

export const useDepartmentDelete = (departmentId: string) => {
    return useMutation<null, { department: DeleteDepartmentInput }>(deleteMutation, {
        variables: {
            department: { departmentId },
        },
        refetchQueries: [getQuery],
    });
};
