import { useMutation, useQuery } from "@apollo/client";
import { CreateProjectInput, UpdateProjectInput } from "cv-graphql";
import { CREATE_PROJECT, DELETE_PROJECT, PROJECTS, UPDATE_PROJECT } from "../api";
import { ProjectsResult, CreateProjectResult, UpdateProjectResult } from "../api/projects.types";

export const useProjects = () => {
    const query = useQuery<ProjectsResult>(PROJECTS);
    return { projects: query.data?.projects ?? [], ...query };
};

export const useProjectCreate = () => {
    return useMutation<CreateProjectResult, { project: CreateProjectInput }>(CREATE_PROJECT, {
        refetchQueries: [PROJECTS],
    });
};

export const useProjectUpdate = () => {
    return useMutation<UpdateProjectResult, { project: UpdateProjectInput }>(UPDATE_PROJECT, {
        refetchQueries: [PROJECTS],
    });
};

export const useProjectDelete = (projectId: string) => {
    return useMutation(DELETE_PROJECT, {
        variables: {
            project: {
                projectId,
            },
        },
        refetchQueries: [PROJECTS],
    });
};
