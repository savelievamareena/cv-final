import { useState } from "react";
import ButtonTemplate from "./ButtonTemplate";
import InputTemplate from "./InputTemplate";
import TableTemplate from "./TableTemplate";
import { useTranslation } from "react-i18next";

const PageTamplate = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { t } = useTranslation();
    return (
        <div style={{ width: "100vw" }}>
            <InputTemplate onChange={(e) => setSearchQuery(e.target.value)} />
            <ButtonTemplate tittle={t("Welcome Back")} onClick={() => console.log(12)} />
            <TableTemplate searchQuery={searchQuery} />
        </div>
    );
};

export default PageTamplate;
