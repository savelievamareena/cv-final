import { Dispatch, FC, SetStateAction } from "react";
import { Department, Skill } from "cv-graphql";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TableTemplate, { ColumnConfig } from "./table-template";
import { Action } from "./actions-menu";

interface PageTemplateProps<T> {
    pageTitle: string;
    onButtonClick: () => void;
    menuProps: Action[];
    columnConfigs: ColumnConfig<T>[];
    searchQuery: string;
    displayData: T[];
    loading: boolean;
    setSearchQuery: Dispatch<SetStateAction<string>>;
}

const PageTemplate: FC<PageTemplateProps<Skill | Department>> = ({
    pageTitle,
    onButtonClick,
    menuProps,
    columnConfigs,
    searchQuery,
    displayData,
    loading,
    setSearchQuery,
}) => {
    return (
        <div style={{ width: "100vw" }}>
            <Input
                placeholder='Search'
                onChange={() => setSearchQuery}
                prefix={<SearchOutlined />}
            />
            <Button type='primary' danger ghost onClick={onButtonClick}>
                {pageTitle}
            </Button>
            <TableTemplate
                searchQuery={searchQuery}
                menuProps={menuProps}
                columnConfigs={columnConfigs}
                data={displayData}
                loading={loading}
            />
        </div>
    );
};

export default PageTemplate;
