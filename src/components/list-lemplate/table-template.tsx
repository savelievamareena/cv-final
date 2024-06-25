import { Key } from "react";
import ActionsMenu, { Action } from "./actions-menu";
import { Table, TableColumnsType } from "antd";
import { t } from "i18next";

import styles from "./list-template.module.scss";
import ActionsMenuEmployee from "./actions-menu-employee";

export interface ColumnConfig<T> {
    name: keyof T;
    isSorted: boolean;
}

interface TableTemplateProps<T extends { id: Key }> {
    searchQuery: string;
    menuProps: Action;
    columnConfigs: ColumnConfig<T>[];
    data: T[];
    loading: boolean;
    pageName: string;
    isAdmin: boolean;
}

type DynamicDataType<T> = T & { key: Key };

const getActionColumn = (pageName: string, menuProps: Action, isAdmin: boolean) => ({
    title: "",
    dataIndex: "",
    key: "x",
    width: "5%",
    render: (record: { id: string }) =>
        isAdmin ? (
            <ActionsMenu
                pageName={pageName}
                onDelete={menuProps.onDelete}
                onUpdate={menuProps.onUpdate}
                record={record}
            />
        ) : (
            <ActionsMenuEmployee
                pageName={pageName}
                onUpdate={menuProps.onUpdate}
                record={record}
            />
        ),
});

const TableTemplate = <T extends { id: Key }>({
    searchQuery,
    menuProps,
    columnConfigs,
    data,
    loading,
    pageName,
    isAdmin,
}: TableTemplateProps<T>) => {
    const createColumnsAndData = (columnConfigs: ColumnConfig<T>[], data: T[]) => {
        const columns: TableColumnsType<DynamicDataType<T>> = columnConfigs.map((config) => {
            const render = (text: string | null) => {
                switch (config.name) {
                    case "avatar":
                        return text ? (
                            <img
                                src={text}
                                alt="avatar"
                                style={{ width: 50, height: 50, borderRadius: "50%" }}
                            />
                        ) : null;
                    case "end_date":
                        return text ?? "Till now";
                    default:
                        return text;
                }
            };

            return {
                title:
                    config.name.toString().charAt(0).toUpperCase() +
                    config.name.toString().slice(1),
                dataIndex: config.name as string,
                key: config.name as string,
                sorter: config.isSorted
                    ? (a, b) => {
                          if (a[config.name] < b[config.name]) return -1;
                          if (a[config.name] > b[config.name]) return 1;
                          return 0;
                      }
                    : undefined,
                render,
            };
        });

        if (isAdmin || pageName === t("cvs.cv") || pageName === t("users.user")) {
            columns.push(getActionColumn(pageName, menuProps, isAdmin));
        }
        const filteredData: DynamicDataType<T>[] = data
            .filter((item) => {
                const firstColumnName = columnConfigs[0].name;
                return item[firstColumnName]
                    ?.toString()
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            })
            .map((item) => ({
                key: item.id,
                ...item,
            }));

        return { columns, data: filteredData };
    };

    const { columns, data: filteredData } = createColumnsAndData(columnConfigs, data);

    return (
        <div className={styles.tableWrapper}>
            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{ hideOnSinglePage: true }}
                loading={loading}
                rowKey="key"
                className={styles.table}
            />
        </div>
    );
};

export default TableTemplate;
