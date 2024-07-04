import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useConfirm } from "@/components/confirm-dialog/";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ListTemplate } from "@/components/list-lemplate/list-template";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { CvTransformed, mapCvDataToTable } from "@/helpers/convert/maps";
import { routes, RouteParams } from "@/router";
import { useCvCreate, useCvDelete } from "../api";
import { useUserCvs } from "../api/get-user-cvs";
import { useCvDialog } from "./cvs-dialog";

const columnConfigs: ColumnConfig<CvTransformed>[] = [
    { name: "name", isSorted: true },
    { name: "description", isSorted: false },
];

const CvsList = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const { cvs, loading } = useUserCvs(userId ?? "");

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
                            userId: userId,
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
