import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { RelativePaths, routes } from "./constants";
import { MainLayout } from "src/components/main-layout";
import { ErrorComponent } from "src/components/error-component";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    errorElement={<ErrorComponent />}
                    path={routes.auth.root}
                    element={
                        <div>
                            Auth layout (has Outlet and a redirect for already authorised users)
                            <Outlet />
                        </div>
                    }
                >
                    <Route
                        errorElement={<ErrorComponent />}
                        path={routes.auth.login}
                        element={<div>Logging In stuff</div>}
                    />
                    <Route
                        errorElement={<ErrorComponent />}
                        path={routes.auth.signUp}
                        element={<div>Signing Up stuff</div>}
                    />
                    <Route
                        errorElement={<ErrorComponent />}
                        path={routes.auth.verification}
                        element={<div>Verification stuff</div>}
                    />
                    <Route index path='*' element={<Navigate to={RelativePaths.Login} replace />} />
                </Route>
                <Route
                    errorElement={<ErrorComponent />}
                    path={routes.root}
                    element={<MainLayout />}
                >
                    <Route index element={<Navigate to={routes.cvs.root} replace />} />
                    <Route path={routes.cvs.root}>
                        <Route
                            errorElement={<ErrorComponent />}
                            index
                            element={<div>CVs page content (table)</div>}
                        />
                        <Route
                            path={routes.cvs.cvById}
                            element={
                                <div>
                                    Common CV-by-ID layout (has Outlet)
                                    <Outlet />
                                </div>
                            }
                        >
                            <Route
                                errorElement={<ErrorComponent />}
                                path={routes.cvs.details}
                                element={<div>CV details content</div>}
                            />
                            <Route
                                errorElement={<ErrorComponent />}
                                path={routes.cvs.preview}
                                element={<div>CV preview content</div>}
                            />
                            <Route
                                errorElement={<ErrorComponent />}
                                path={routes.cvs.projects}
                                element={<div>CV projects content</div>}
                            />
                            <Route
                                errorElement={<ErrorComponent />}
                                path={routes.cvs.skills}
                                element={<div>CV skills content</div>}
                            />
                            <Route
                                index
                                path='*'
                                element={<Navigate to={RelativePaths.Details} replace />}
                            />
                        </Route>
                    </Route>
                    <Route path={routes.users.root}>
                        <Route
                            errorElement={<ErrorComponent />}
                            index
                            element={<div>Users page content (table)</div>}
                        />
                        <Route
                            path={routes.users.userById}
                            element={
                                <div>
                                    Common user-by-ID layout (has Outlet)
                                    <Outlet />
                                </div>
                            }
                        >
                            <Route
                                errorElement={<ErrorComponent />}
                                path={routes.users.profile}
                                element={<div>user profile content</div>}
                            />
                            <Route
                                errorElement={<ErrorComponent />}
                                path={routes.users.languages}
                                element={<div>user languages content</div>}
                            />
                            <Route
                                errorElement={<ErrorComponent />}
                                path={routes.users.skills}
                                element={<div>user skills content</div>}
                            />
                            <Route
                                errorElement={<ErrorComponent />}
                                path={routes.users.cvs}
                                element={<div>user CVs content</div>}
                            />
                            <Route
                                index
                                path='*'
                                element={<Navigate to={RelativePaths.Profile} replace />}
                            />
                        </Route>
                    </Route>
                    <Route path={routes.projects.root}>
                        <Route
                            errorElement={<ErrorComponent />}
                            index
                            element={<div>Projects page content (table)</div>}
                        />
                        <Route
                            errorElement={<ErrorComponent />}
                            path={routes.projects.details}
                            element={<div>project details content</div>}
                        />
                        <Route path='*' element={<Navigate to='' replace />} />
                    </Route>
                    <Route
                        errorElement={<ErrorComponent />}
                        path={routes.departments}
                        element={<div>Departments page content (table)</div>}
                    />
                    <Route
                        errorElement={<ErrorComponent />}
                        path={routes.settings}
                        element={<div>Departments page content (table)</div>}
                    />
                    <Route
                        errorElement={<ErrorComponent />}
                        path={routes.skills}
                        element={<div>Skills page content (table)</div>}
                    />
                    <Route
                        errorElement={<ErrorComponent />}
                        path={routes.languages}
                        element={<div>Languages page content (table)</div>}
                    />
                    <Route index path='*' element={<Navigate to={""} replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
