import { useState } from "react";
import ButtonTemplate from "./ButtonTemplate";
import InputTemplate from "./InputTemplate";
import TableTemplate from "./TableTemplate";
import { useTranslation } from "react-i18next";
import { Action } from "./ActionsMenu";
import { useDepartments } from "src/Api/mutation/departments";
import { Department } from "cv-graphql";

const PageTamplate = () => {
    const { t } = useTranslation();
    const { departments, loading } = useDepartments();
    const [searchQuery, setSearchQuery] = useState("");
    const menuProps: Action[] = [
        {
            tittle: "delete",
            onClick: () => console.log("delete"),
        },
        {
            tittle: "update",
            onClick: () => console.log("update"),
        },
    ];

    const columnNames: (keyof Department)[] = ["name"];
    return (
        <div style={{ width: "100vw" }}>
            <InputTemplate onChange={(e) => setSearchQuery(e.target.value)} />
            <ButtonTemplate tittle={t("Welcome Back")} onClick={() => console.log(12)} />
            <TableTemplate
                searchQuery={searchQuery}
                menuProps={menuProps}
                columnNames={columnNames}
                data={departments}
                loading={loading}
            />
        </div>
    );
};

export default PageTamplate;
