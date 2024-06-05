import { Dispatch, SetStateAction } from "react";
import { Department, Skill, UserRole } from "cv-graphql";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TableTemplate, { ColumnConfig } from "./table-template";
import { Action } from "./actions-menu";

import { useTranslation } from "react-i18next";
import { useAuthUser } from "@/services/auth-service";

interface ListTemplateProps<T> {
    pageName: string;
    onButtonClick: () => void;
    menuProps: Action;
    columnConfigs: ColumnConfig<T>[];
    searchQuery: string;
    displayData: T[];
    loading: boolean;
    setSearchQuery: Dispatch<SetStateAction<string>>;
}

const ListTemplate = ({
    pageName,
    onButtonClick,
    menuProps,
    columnConfigs,
    searchQuery,
    displayData,
    loading,
    setSearchQuery,
}: ListTemplateProps<Skill | Department>) => {
    const user = useAuthUser();
    const isAdmin = user ? user.role === UserRole.Admin : false;

    const { t } = useTranslation();

    return (
        <div style={{ width: "100vw" }}>
            <Input
                placeholder={t("search")}
                onChange={() => setSearchQuery}
                prefix={<SearchOutlined />}
            />
            {isAdmin && (
                <Button type="primary" danger ghost onClick={onButtonClick}>
                    {t("add")} {pageName}
                </Button>
            )}
            <TableTemplate
                searchQuery={searchQuery}
                menuProps={menuProps}
                columnConfigs={columnConfigs}
                data={displayData}
                loading={loading}
                pageName={pageName}
                isAdmin={isAdmin}
            />
        </div>
    );
};

export default ListTemplate;
