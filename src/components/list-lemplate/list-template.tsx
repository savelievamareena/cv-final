import { ChangeEvent, Key } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRole } from "cv-graphql";
import { Button, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useAuthUser } from "@/services/auth-service";
import TableTemplate, { ColumnConfig } from "./table-template";
import { Action } from "./actions-menu";

import styles from "./list-template.module.scss";
import { RouteParams } from "@/router";

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
    const { [RouteParams.UserId]: userId } = useParams();

    const canEdit = user?.role === UserRole.Admin || user?.id === userId;

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
                {canEdit && (
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
                canEdit={canEdit}
            />
        </div>
    );
};

export default ListTemplate;
