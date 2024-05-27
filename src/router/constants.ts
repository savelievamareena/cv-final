export const enum RelativePaths {
    Details = "details",
    Profile = "profile",
    Login = "login",
}

const authRoutes = {
    root: "/auth",
    login: `/auth/${RelativePaths.Login}`,
    signUp: "/auth/signup",
    verification: "/auth/verification",
};

export const enum RouteParams {
    CvId = "cvId",
    UserId = "userId",
    ProjectId = "projectId",
}

const userRoutes = {
    root: "/users",
    userById: (userId: string) => `/users/${userId}`,
    profile: (userId: string) => `/users/${userId}/${RelativePaths.Profile}`,
    skills: (userId: string) => `/users/${userId}/skills`,
    languages: (userId: string) => `/users/${userId}/languages`,
    cvs: (userId: string) => `/users/${userId}/cvs`,
};

const CVRoutes = {
    root: "/cvs",
    cvById: (cvId: string) => `/cvs/${cvId}`,
    details: (cvId: string) => `/cvs/${cvId}/${RelativePaths.Details}`,
    skills: (cvId: string) => `/cvs/${cvId}/skills`,
    projects: (cvId: string) => `/cvs/${cvId}/projects`,
    preview: (cvId: string) => `/cvs/${cvId}/preview`,
};

const projectRoutes = {
    root: "/projects",
    details: (projectId: string) => `/projects/${projectId}`,
};

export const routes = {
    root: "/",
    settings: "/settings",
    departments: "/departments",
    positions: "/positions",
    skills: "/skills",
    languages: "/languages",
    auth: authRoutes,
    cvs: CVRoutes,
    users: userRoutes,
    projects: projectRoutes,
};
