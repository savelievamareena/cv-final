import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "@/components/confirm-dialog/";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ListTemplate } from "@/components/list-lemplate/list-template";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { CvTransformed, mapCvDataToTable } from "@/helpers/convert/maps";
import { routes } from "@/router";
import { useCvCreate, useCvDelete, useCvsQuery } from "../api";
import { useCvDialog } from "./cvs-dialog";

const columnConfigs: ColumnConfig<CvTransformed>[] = [
    { name: "name", isSorted: true },
    { name: "description", isSorted: false },
    { name: "employee", isSorted: true },
];

const CvsList = () => {
    const { cvs, loading } = useCvsQuery();

    const navigate = useNavigate();

    const [openConfirm] = useConfirm();
    const [openCvDialog] = useCvDialog();
    const [createCv] = useCvCreate();
    const [deleteCv] = useCvDelete();

    const menuProps: Action = {
        onDelete: (id: string) =>
            openConfirm({
                title: t("deleteConfirmation"),
                onConfirm: () => void deleteCv({ variables: { cv: { cvId: id } } }),
            }),

        onUpdate: (id: string) => navigate(routes.cvs.cvById(id)),
    };

    const openCv = () =>
        openCvDialog({
            title: t("cvs.addCv"),
            onConfirm: (formData) =>
                void createCv({
                    variables: {
                        cv: {
                            name: formData.name,
                            description: formData.description,
                            education: formData.education,
                        },
                    },
                }),
            initialValues: { name: "", description: "", education: "" },
        });

    const convertedCvs = mapCvDataToTable(cvs);

    return (
        <ListTemplate
            pageName={t("cvs.cv")}
            onButtonClick={openCv}
            menuProps={menuProps}
            columnConfigs={columnConfigs}
            displayData={convertedCvs}
            loading={loading}
        />
    );
};

export default CvsList;
