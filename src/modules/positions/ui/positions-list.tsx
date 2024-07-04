import { Position } from "cv-graphql";
import { t } from "i18next";
import { usePositionsQuery } from "@/api";
import { useConfirm } from "@/components/confirm-dialog/";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ListTemplate } from "@/components/list-lemplate/list-template";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { usePositionCreate, usePositionDelete, usePositionUpdate } from "../api";
import { usePositionDialog } from "./positions-dialog";

const columnConfigs: ColumnConfig<Position>[] = [{ name: "name", isSorted: true }];

const PositionsList = () => {
    const { positions, loading } = usePositionsQuery();
    const [openConfirm] = useConfirm();

    const [openPositionDialog] = usePositionDialog();
    const [createPosition] = usePositionCreate();
    const [deletePosition] = usePositionDelete();
    const [updatePosition] = usePositionUpdate();

    const menuProps: Action = {
        onDelete: (id: string) =>
            openConfirm({
                title: t("deleteConfirmation"),
                onConfirm: () =>
                    void deletePosition({ variables: { position: { positionId: id } } }),
            }),

        onUpdate: (id: string) =>
            openPositionDialog({
                title: t("positions.updatePosition"),
                onConfirm: (formData) =>
                    void updatePosition({
                        variables: {
                            position: {
                                name: formData.position,
                                positionId: id,
                            },
                        },
                    }),
                initialValues: {
                    position: positions.find((position) => position.id === id)?.name ?? "",
                },
            }),
    };

    const openPosition = () =>
        openPositionDialog({
            title: t("positions.addPosition"),
            onConfirm: (formData) =>
                void createPosition({
                    variables: {
                        position: {
                            name: formData.position,
                        },
                    },
                }),
            initialValues: { position: "" },
        });

    return (
        <ListTemplate
            pageName={t("positions.positions")}
            onButtonClick={openPosition}
            menuProps={menuProps}
            columnConfigs={columnConfigs}
            displayData={positions}
            loading={loading}
        />
    );
};

export default PositionsList;
