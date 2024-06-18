import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import { RelativePaths, RouteParams, routes } from "./constants";
import { MainLayout } from "@/components/main-layout";
import { ErrorComponent } from "@/components/error-component";
import { AuthLayout } from "@/modules/auth/components/auth-layout";
import { Login } from "@/pages/login";
import { SignUp } from "@/pages/sign-up";
import { VerifyMail } from "@/pages/verify-mail";
import { DepartmentsPage } from "@/pages/departments";
import { LanguagesPage } from "@/pages/languages";
import { PositionsPage } from "@/pages/positions";
import { SkillsPage } from "@/pages/skills";
import { ProjectDetails } from "@/pages/project-details";
import { CvPage } from "@/pages/cvs";
import { Details } from "@/modules/cvs/components/details";
import { UserLayout } from "@/modules/users/components/user-layout";
import { UserProfile } from "@/pages/user-profile";
import { UsersPage } from "@/pages/users";

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
                        element: (
                            <div>
                                Tabs component
                                <Outlet />
                            </div>
                        ),
                        children: [
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.cvs.details(`:${RouteParams.CvId}`),
                                element: <Details />,
                            },
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.cvs.skills(`:${RouteParams.CvId}`),
                                element: <div>CV skills content</div>,
                            },
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.cvs.preview(`:${RouteParams.CvId}`),
                                element: <div>CV preview content</div>,
                            },
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.cvs.projects(`:${RouteParams.CvId}`),
                                element: <div>CV projects content</div>,
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
                                element: <div>User skills content</div>,
                            },
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.users.languages(`:${RouteParams.UserId}`),
                                element: <div>User languages content</div>,
                            },
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.users.cvs(`:${RouteParams.UserId}`),
                                element: <div>User CVs content</div>,
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
                        element: <div>Projects page content (table)</div>,
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
                element: <div>Settings page content</div>,
            },
            {
                index: true,
                path: "*",
                element: <Navigate to="" replace />,
            },
        ],
    },
]);
