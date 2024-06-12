import { ChangeEvent, Key } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRole } from "cv-graphql";
import { Button, Input } from "antd";
import { useAuthUser } from "@/services/auth-service";
import { SearchOutlined } from "@ant-design/icons";
import TableTemplate, { ColumnConfig } from "./table-template";
import { Action } from "./actions-menu";

import styles from "./list-template.module.scss";

interface ListTemplateProps<T> {
    pageName: string;
    onButtonClick: () => void;
    menuProps: Action;
    columnConfigs: ColumnConfig<T>[];
    displayData: T[];
    loading: boolean;
}

const ListTemplate = <T extends { id: Key }>({
    pageName,
    onButtonClick,
    menuProps,
    columnConfigs,
    displayData,
    loading,
}: ListTemplateProps<T>) => {
    const user = useAuthUser();
    const isAdmin = user?.role === UserRole.Admin;

    const { t } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchParams({ search: e.target.value });
    };

    return (
        <div className={styles.listWrapper}>
            <Input
                placeholder={t("search")}
                onChange={(e) => handleInputChange(e)}
                value={searchParams.get("search") ?? ""}
                prefix={<SearchOutlined />}
            />
            {isAdmin && (
                <Button type="primary" danger ghost onClick={onButtonClick}>
                    {t("add")} {pageName}
                </Button>
            )}
            <TableTemplate<T>
                searchQuery={searchParams.get("search") ?? ""}
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
