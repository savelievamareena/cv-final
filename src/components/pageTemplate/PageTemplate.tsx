import ButtonTemplate from "./ButtonTemplate";
import InputTemplate from "./InputTemplate";
import TableTemplate from "./TableTemplate";
import { Action } from "./ActionsMenu";

interface PageTemplateProps<T> {
    pageTitle: string;
    onButtonClick: () => void;
    menuProps: Action[];
    columnNames: (keyof T)[];
    searchQuery: string;
    displayData: T[];
    loading: boolean;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
//TODO fix any type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PageTemplate: React.FC<PageTemplateProps<any>> = ({
    pageTitle,
    onButtonClick,
    menuProps,
    columnNames,
    searchQuery,
    displayData,
    loading,
    setSearchQuery,
}) => {
    return (
        <div style={{ width: "100vw" }}>
            <InputTemplate onChange={(e) => setSearchQuery(e.target.value)} />
            <ButtonTemplate tittle={pageTitle} onClick={onButtonClick} />
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
