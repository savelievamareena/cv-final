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
    const { departments } = useDepartments();

    const menuProps = [
        {
            tittle: "delete",
            onClick: () => console.log(departments),
        },
        {
            tittle: "update",
            onClick: () => console.log(departments),
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
        <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ hideOnSinglePage: true }}
        />
    );
};

export default TableTemplate;
