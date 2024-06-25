import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import { UserRole } from "cv-graphql";
import { ChangeEvent, Key } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Action } from "./actions-menu";
import styles from "./list-template.module.scss";
import TableTemplate, { ColumnConfig } from "./table-template";
import { useAuthUser } from "@/services/auth-service";

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
            <Content className={styles.searchCreateContainer}>
                <Input
                    type="primary"
                    className={styles.search}
                    placeholder={t("search")}
                    onChange={(e) => handleInputChange(e)}
                    value={searchParams.get("search") ?? ""}
                    prefix={<SearchOutlined />}
                />
                {isAdmin && (
                    <Button
                        type="primary"
                        danger
                        ghost
                        onClick={onButtonClick}
                        icon={<PlusOutlined />}
                        className={styles.createButton}
                    >
                        {t("add")} {pageName}
                    </Button>
                )}
            </Content>

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
