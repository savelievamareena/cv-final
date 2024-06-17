import { Project } from "cv-graphql";

export interface ProjectResult {
    project: Project;
}

export interface ProjectsResult {
    projects: Project[];
}

export interface CreateProjectResult {
    createProject: Project;
}

export interface UpdateProjectResult {
    updateProject: Project;
}

export interface QueryArgs {
    projectId?: string;
}
