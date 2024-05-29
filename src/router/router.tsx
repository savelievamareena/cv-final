import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { RelativePaths, RouteParams, routes } from "./constants";
import { ErrorComponent } from "@/components/error-component";
import { MainLayout } from "@/components/main-layout";
import { AuthLayout } from "@/modules/auth/components/auth-layout/auth-layout";
import { Login } from "@/pages/login";
import { SignUp } from "@/pages/sign-up";
import { VerifyMail } from "@/pages/verify-mail";

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
                index: true,
                element: <Navigate to={routes.cvs.root} replace />,
            },
            {
                path: routes.cvs.root,
                children: [
                    {
                        errorElement: <ErrorComponent />,
                        index: true,
                        element: <div>CVs page content (table)</div>,
                    },
                    {
                        errorElement: <ErrorComponent />,
                        path: routes.cvs.cvById(`:${RouteParams.CvId}`),
                        element: (
                            <div>
                                Common CV-by-ID layout (has Outlet)
                                <Outlet />
                            </div>
                        ),
                        children: [
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.cvs.details(`:${RouteParams.CvId}`),
                                element: <div>CV details content</div>,
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
                        element: <div>Users page content (table)</div>,
                    },
                    {
                        errorElement: <ErrorComponent />,
                        path: routes.users.userById(`:${RouteParams.UserId}`),
                        element: (
                            <div>
                                Common User-by-ID layout (has Outlet)
                                <Outlet />
                            </div>
                        ),
                        children: [
                            {
                                errorElement: <ErrorComponent />,
                                path: routes.users.profile(`:${RouteParams.UserId}`),
                                element: <div>User profile content</div>,
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
                        element: <div>Project details content</div>,
                        children: [
                            {
                                index: true,
                                path: "*",
                                element: <Navigate to='' replace />,
                            },
                        ],
                    },
                ],
            },
            {
                errorElement: <ErrorComponent />,
                path: routes.departments,
                element: <div>Departments page content (table)</div>,
            },
            {
                errorElement: <ErrorComponent />,
                path: routes.skills,
                element: <div>Skills page content (table)</div>,
            },
            {
                errorElement: <ErrorComponent />,
                path: routes.languages,
                element: <div>Languages page content (table)</div>,
            },
            {
                errorElement: <ErrorComponent />,
                path: routes.settings,
                element: <div>Settings page content</div>,
            },
            {
                index: true,
                path: "*",
                element: <Navigate to={routes.cvs.root} replace />,
            },
        ],
    },
]);
