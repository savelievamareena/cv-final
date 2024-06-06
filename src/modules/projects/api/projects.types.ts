import { Project } from "cv-graphql";

export interface ProjectsResult {
    projects: Project[];
}

export interface CreateProjectResult {
    createProject: Project;
}

export interface UpdateProjectResult {
    updateProject: Project;
}
