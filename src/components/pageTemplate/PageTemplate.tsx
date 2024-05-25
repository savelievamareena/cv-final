import ButtonTemplate from "./ButtonTemplate";
import InputTemplate from "./InputTemplate";
import TableTemplate from "./TableTemplate";
import { useTranslation } from "react-i18next";
import { Action } from "./ActionsMenu";

interface PageTemplateProps<T> {
    menuProps: Action[];
    columnNames: (keyof T)[];
    searchQuery: string;
    displayData: T[];
    loading: boolean;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PageTemplate: React.FC<PageTemplateProps<any>> = ({
    menuProps,
    columnNames,
    searchQuery,
    displayData,
    loading,
    setSearchQuery,
}) => {
    const { t } = useTranslation();

    return (
        <div style={{ width: "100vw" }}>
            <InputTemplate onChange={(e) => setSearchQuery(e.target.value)} />
            <ButtonTemplate tittle={t("Welcome Back")} onClick={() => console.log(12)} />
            <TableTemplate
                searchQuery={searchQuery}
                menuProps={menuProps}
                columnNames={columnNames}
                data={displayData}
                loading={loading}
            />
        </div>
    );
};

export default PageTemplate;
