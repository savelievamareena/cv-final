import ActionsMenu, { Action } from "./ActionsMenu";
// import { gql, useLazyQuery } from "@apollo/client";
import { Table, TableColumnsType } from "antd";

interface TableTemplateProps<T extends { id: React.Key }> {
    searchQuery: string;
    menuProps: Action[];
    columnNames: (keyof T)[];
    data: T[];
    loading: boolean;
}

type DynamicDataType<T> = T & { key: React.Key };

const TableTemplate = <T extends { id: React.Key }>({
    searchQuery,
    menuProps,
    columnNames,
    data,
    loading,
}: TableTemplateProps<T>) => {
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
    const createColumnsAndData = (columnNames: (keyof T)[], data: T[]) => {
        const columns: TableColumnsType<DynamicDataType<T>> = columnNames.map((name) => ({
            title: name.toString().charAt(0).toUpperCase() + name.toString().slice(1),
            dataIndex: name as string,
            key: name as string,
            sorter: (a, b) => {
                if (a[name] < b[name]) return -1;
                if (a[name] > b[name]) return 1;
                return 0;
            },
        }));

        columns.push({
            title: "",
            dataIndex: "",
            key: "x",
            width: "5%",
            render: () => <ActionsMenu actionProps={menuProps} />,
        });

        const filteredData: DynamicDataType<T>[] = data
            .filter((item) =>
                columnNames.some((col) =>
                    item[col]?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
                ),
            )
            .map((item) => ({
                key: item.id,
                ...item,
            }));

        return { columns, data: filteredData };
    };

    const { columns, data: filteredData } = createColumnsAndData(columnNames, data);

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
