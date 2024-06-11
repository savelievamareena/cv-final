import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import ListTemplate from "@/components/list-lemplate/list-template";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useConfirm } from "@/components/confirm-dialog/";
import { useCvCreate, useCvDelete, useCvsQuery } from "../api";
import { useAddCv } from "./cvs-dialog";
import { convertCvToTable, CvTransformed } from "@/helpers/convert/cv-to-table";

const columnConfigs: ColumnConfig<CvTransformed>[] = [
    { name: "name", isSorted: true },
    { name: "description", isSorted: false },
    { name: "employee", isSorted: true },
];

const CvsList = () => {
    const { cvs, loading } = useCvsQuery();
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const [openConfirm] = useConfirm();
    const [openAddCv] = useAddCv();
    const [createCv] = useCvCreate();
    const [deleteCv] = useCvDelete();

    const menuProps: Action = {
        onDelete: (id: string) =>
            openConfirm({
                title: t("delete confirmation"),
                onConfirm: () => void deleteCv({ variables: { cv: { cvId: id } } }),
            }),

        onUpdate: (id: string) => navigate(`/routes/cvs/${id}`),
    };

    const openCv = () =>
        openAddCv({
            title: t("Add cv"),
            onConfirm: (formData) =>
                void createCv({
                    variables: {
                        cv: {
                            name: formData.cv,
                            description: formData.description,
                        },
                    },
                }),
            initialValues: { cv: "", description: "" },
        });

    const convertedCvs = convertCvToTable(cvs);

    return (
        <ListTemplate
            pageName={t("cvs.cv")}
            onButtonClick={openCv}
            menuProps={menuProps}
            columnConfigs={columnConfigs}
            searchQuery={searchQuery}
            displayData={convertedCvs}
            loading={loading}
            setSearchQuery={setSearchQuery}
        />
    );
};

export default CvsList;