import { Dispatch, SetStateAction } from "react";
import { Department, Skill, User, UserRole } from "cv-graphql";
import { Button, Input } from "antd";
import { t } from "i18next";
import { SearchOutlined } from "@ant-design/icons";
import TableTemplate, { ColumnConfig } from "./table-template";
import { Action } from "./actions-menu";
import { localStorageService } from "@/services/storage-service";
import { StorageKeys } from "@/constants";

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
    const user = localStorageService.getItem(StorageKeys.User);
    const isAdmin = user ? (JSON.parse(user) as User).role === UserRole.Admin : null;

    return (
        <div style={{ width: "100vw" }}>
            <Input
                placeholder={t("search")}
                onChange={() => setSearchQuery}
                prefix={<SearchOutlined />}
            />
            {isAdmin && (
                <Button type='primary' danger ghost onClick={onButtonClick}>
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
            />
        </div>
    );
};

export default ListTemplate;
