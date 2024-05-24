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

const userRoutes = {
    root: "/users",
    userById: "/users/:userId",
    profile: `/users/:userId/${RelativePaths.Profile}`,
    skills: "/users/:userId/skills",
    languages: "/users/:userId/languages",
    cvs: "/users/:userId/cvs",
};

const CVRoutes = {
    root: "/cvs",
    cvById: "/cvs/:cvId",
    details: `/cvs/:cvId/${RelativePaths.Details}`,
    skills: "/cvs/:cvId/skills",
    projects: "/cvs/:cvId/projects",
    preview: "/cvs/:cvId/preview",
};

const projectRoutes = {
    root: "/projects",
    details: "/projects/:projectId",
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
