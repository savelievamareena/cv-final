import DepartmentsPage from "@/pages/Departments/Departments.page";
import SkillsPage from "@/pages/skills/Skills.page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DepartmentsPage />,
    },
    {
        path: "/skills",
        element: <SkillsPage />,
    },
]);
