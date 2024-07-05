import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

import { CVDetails } from "@/pages/cv-details";
import { CVPreview } from "@/pages/cv-preview";
import { CVProjects } from "@/pages/cv-projects";
import { CVSkills } from "@/pages/cv-skills";
import { CvPage } from "@/pages/cvs";
import { DepartmentsPage } from "@/pages/departments";
import { LanguagesPage } from "@/pages/languages";
import { Login } from "@/pages/login";
import { PositionsPage } from "@/pages/positions";
import { ProjectDetails } from "@/pages/project-details";
import { ProjectsPage } from "@/pages/projects";
import { SettingsPage } from "@/pages/settings";
import { SignUp } from "@/pages/sign-up";
import { SkillsPage } from "@/pages/skills";
import { UserCVs } from "@/pages/user-cvs";
import { UserLanguages } from "@/pages/user-languages";
import { UserProfile } from "@/pages/user-profile";
import { UserSkills } from "@/pages/user-skills";
import { UsersPage } from "@/pages/users";
import { VerifyMail } from "@/pages/verify-mail";
import { RelativePaths, RouteParams, routes } from "./constants";

const CV = lazy(() => import("@/modules/cvs"));
const MainLayout = lazy(() => import("@/components/main-layout"));
const AuthLayout = lazy(() => import("@/modules/auth/components/auth-layout"));
const ErrorComponent = lazy(() => import("@/components/error-component"));
const UserLayout = lazy(() => import("@/modules/users/components/user-layout"));

export const router = createBrowserRouter([
    {
        path: routes.auth.root,
        element: <AuthLayout />,
        errorElement: <ErrorComponent />,
        children: [
            {
                errorElement: <ErrorComponent />,
                path: routes.auth.login,
                element: <Login />,
            },
            {
                errorElement: <ErrorComponent />,
                path: routes.auth.signUp,
                element: <SignUp />,
            },
            {
                errorElement: <ErrorComponent />,
                path: routes.auth.verification,
                element: <VerifyMail />,
            },
            {
                index: true,
                path: "*",
                element: <Navigate to={RelativePaths.Login} replace />,
            },
        ],
    },
    {
        path: routes.root,
        element: <MainLayout />,
        errorElement: <ErrorComponent />,
        children: [
            {
                errorElement: <ErrorComponent />,
                index: true,
                element: <UsersPage />,
            },
            {
                path: routes.cvs.root,
                children: [
                    {
                        errorElement: <ErrorComponent />,
                        index: true,
                        element: <CvPage />,
                    },
                    {
                        errorElement: <ErrorComponent />,
                        path: routes.cvs.cvById(`:${RouteParams.CvId}`),
                        element: <CV />,
                        children: [
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.cvs.details(`:${RouteParams.CvId}`),
                                element: <CVDetails />,
                            },
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.cvs.skills(`:${RouteParams.CvId}`),
                                element: <CVSkills />,
                            },
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.cvs.preview(`:${RouteParams.CvId}`),
                                element: <CVPreview />,
                            },
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.cvs.projects(`:${RouteParams.CvId}`),
                                element: <CVProjects />,
                            },
                            {
                                index: true,
                                path: "*",
                                element: <Navigate to={RelativePaths.Details} replace />,
                            },
                        ],
                    },
                ],
            },

            {
                path: routes.users.root,
                children: [
                    {
                        errorElement: <ErrorComponent />,
                        index: true,
                        element: <UsersPage />,
                    },
                    {
                        errorElement: <ErrorComponent />,
                        path: routes.users.userById(`:${RouteParams.UserId}`),
                        element: <UserLayout />,
                        children: [
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.users.profile(`:${RouteParams.UserId}`),
                                element: <UserProfile />,
                            },
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.users.skills(`:${RouteParams.UserId}`),
                                element: <UserSkills />,
                            },
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.users.languages(`:${RouteParams.UserId}`),
                                element: <UserLanguages />,
                            },
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.users.cvs(`:${RouteParams.UserId}`),
                                element: <UserCVs />,
                            },
                            {
                                index: true,
                                path: "*",
                                element: <Navigate to={RelativePaths.Profile} replace />,
                            },
                        ],
                    },
                ],
            },
            {
                path: routes.projects.root,
                children: [
                    {
                        errorElement: <ErrorComponent />,
                        index: true,
                        element: <ProjectsPage />,
                    },
                    {
                        errorElement: <ErrorComponent />,
                        path: routes.projects.details(`:${RouteParams.ProjectId}`),
                        element: <ProjectDetails />,
                        children: [
                            {
                                index: true,
                                path: "*",
                                element: <Navigate to="" replace />,
                            },
                        ],
                    },
                ],
            },
            {
                errorElement: <ErrorComponent />,
                path: routes.departments,
                element: <DepartmentsPage />,
            },
            {
                errorElement: <ErrorComponent />,
                path: routes.skills,
                element: <SkillsPage />,
            },
            {
                errorElement: <ErrorComponent />,
                path: routes.languages,
                element: <LanguagesPage />,
            },
            {
                errorElement: <ErrorComponent />,
                path: routes.positions,
                element: <PositionsPage />,
            },
            {
                errorElement: <ErrorComponent />,
                path: routes.settings,
                element: <SettingsPage />,
            },
            {
                index: true,
                path: "*",
                element: <Navigate to="" replace />,
            },
        ],
    },
]);
