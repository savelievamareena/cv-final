import { useDepartments } from "src/Api/mutation/departments";
import ActionsMenu from "./ActionsMenu";
// import { gql, useLazyQuery } from "@apollo/client";
import { Table, TableColumnsType } from "antd";

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

const TableTemplate: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
    const { departments, loading } = useDepartments();
    // const [getUser] = useLazyQuery(LOGIN, {
    //     variables: {
    //         auth: {
    //             email: "aaklimkov@gmail.com",
    //             password: "qweasd",
    //         },
    //     },
    // });

    const menuProps = [
        {
            tittle: "delete",
            onClick: () => console.log("delete"),
        },
        {
            tittle: "update",
            onClick: () => console.log("update"),
        },
    ];

    interface DataType {
        key: React.Key;
        name: string;
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            },
        },

        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () => <ActionsMenu actionProps={menuProps} />,
        },
    ];

    const filteredData: DataType[] = departments
        .filter((department) => department.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((department) => ({
            key: department.id,
            name: department.name,
        }));

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
            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{ hideOnSinglePage: true }}
                loading={loading}
            />
        </>
    );
};

export default TableTemplate;
