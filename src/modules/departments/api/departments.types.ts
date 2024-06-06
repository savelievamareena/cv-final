import { Department } from "cv-graphql";

export interface DepartmentsResult {
    departments: Department[];
}

export interface CreateDepartmentResult {
    createDepartment: Department;
}

export interface UpdateDepartmentResult {
    updateDepartment: Department;
}
