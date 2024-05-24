import { useState } from "react";
import ButtonTemplate from "./ButtonTemplate";
import InputTemplate from "./InputTemplate";
import TableTemplate from "./TableTemplate";

const PageTamplate = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <>
            <InputTemplate onChange={(e) => setSearchQuery(e.target.value)} />
            <ButtonTemplate tittle='add department' onClick={() => console.log(12)} />
            <TableTemplate searchQuery={searchQuery} />
        </>
    );
};

export default PageTamplate;
