import { Key } from "react";
import ActionsMenu, { Action } from "./actions-menu";
import { Table, TableColumnsType } from "antd";
// import { gql, useLazyQuery } from "@apollo/client";

export interface ColumnConfig<T> {
    name: keyof T;
    isSorted: boolean;
}

interface TableTemplateProps<T extends { id: React.Key }> {
    searchQuery: string;
    menuProps: Action;
    columnConfigs: ColumnConfig<T>[];
    data: T[];
    loading: boolean;
    pageName: string;
}

type DynamicDataType<T> = T & { key: Key };

const TableTemplate = <T extends { id: Key }>({
    searchQuery,
    menuProps,
    columnConfigs,
    data,
    loading,
    pageName,
}: TableTemplateProps<T>) => {
    const createColumnsAndData = (columnConfigs: ColumnConfig<T>[], data: T[]) => {
        const columns: TableColumnsType<DynamicDataType<T>> = columnConfigs.map((config) => ({
            title: config.name.toString().charAt(0).toUpperCase() + config.name.toString().slice(1),
            dataIndex: config.name as string,
            key: config.name as string,
            sorter: config.isSorted
                ? (a, b) => {
                      if (a[config.name] < b[config.name]) return -1;
                      if (a[config.name] > b[config.name]) return 1;
                      return 0;
                  }
                : undefined,
        }));

        columns.push({
            title: "",
            dataIndex: "",
            key: "x",
            width: "5%",
            render: () => (
                <ActionsMenu
                    pageName={pageName}
                    onDelete={menuProps.onDelete}
                    onUpdate={menuProps.onUpdate}
                />
            ),
        });

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

    // const LOGIN = gql`
    //     query Login($auth: AuthInput!) {
    //         login(auth: $auth) {
    //             user {
    //                 id
    //                 email
    //             }
    //             access_token
    //         }
    //     }
    // `;

    // const [getUser] = useLazyQuery(LOGIN, {
    //     variables: {
    //         auth: {
    //             email: "aaklimkov@gmail.com",
    //             password: "qweasd",
    //         },
    //     },
    // });

    const { columns, data: filteredData } = createColumnsAndData(columnConfigs, data);

    return (
        <>
            {/* <button
                onClick={() => {
                    getUser({
                        onCompleted: (data) => {
                            localStorage.setItem("auth-token", data.login.access_token);
                        },
                    });
                }}
            >
                Click me!
            </button> */}
            <div style={{ width: "80vw", margin: "0 auto" }}>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ hideOnSinglePage: true }}
                    loading={loading}
                    rowKey='key'
                />
            </div>
        </>
    );
};

export default TableTemplate;
