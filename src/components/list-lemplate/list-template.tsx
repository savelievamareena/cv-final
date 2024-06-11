import { Dispatch, Key, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { UserRole } from "cv-graphql";
import { Button, Input } from "antd";
import { useAuthUser } from "@/services/auth-service";
import { SearchOutlined } from "@ant-design/icons";
import TableTemplate, { ColumnConfig } from "./table-template";
import { Action } from "./actions-menu";

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

const ListTemplate = <T extends { id: Key }>({
    pageName,
    onButtonClick,
    menuProps,
    columnConfigs,
    searchQuery,
    displayData,
    loading,
    setSearchQuery,
}: ListTemplateProps<T>) => {
    const user = useAuthUser();
    const isAdmin = user?.role === UserRole.Admin;

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
            <TableTemplate<T>
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
