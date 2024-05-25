import DepartmentsPage from "@/modules/departments/ui/Departments.page";
import SkillsPage from "@/modules/skills/ui/Skills.page";
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
