import { useState } from "react";
import { Position } from "cv-graphql";
import { t } from "i18next";
import ListTemplate from "@/components/list-lemplate/list-template";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useConfirm } from "@/components/confirm-dialog/";
import { usePositionCreate, usePositionDelete, usePositionsQuery, usePositionUpdate } from "../api";
import { useAddPosition } from "./positions-dialog";

const columnConfigs: ColumnConfig<Position>[] = [{ name: "name", isSorted: true }];

const PositionsList = () => {
    const { positions, loading } = usePositionsQuery();
    const [searchQuery, setSearchQuery] = useState("");

    const [openConfirm] = useConfirm();

    const [openAddPosition] = useAddPosition();
    const [createPosition] = usePositionCreate();
    const [deletePosition] = usePositionDelete();
    const [updatePosition] = usePositionUpdate();

    const menuProps: Action = {
        onDelete: (id: string) =>
            openConfirm({
                title: t("delete confirmation"),
                onConfirm: () =>
                    void deletePosition({ variables: { position: { positionId: id } } }),
            }),

        onUpdate: (id: string) =>
            openAddPosition({
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
        openAddPosition({
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
            searchQuery={searchQuery}
            displayData={positions}
            loading={loading}
            setSearchQuery={setSearchQuery}
        />
    );
};

export default PositionsList;
