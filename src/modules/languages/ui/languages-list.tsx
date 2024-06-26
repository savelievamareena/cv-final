import { Language } from "cv-graphql";
import { t } from "i18next";
import { useLanguageCreate, useLanguageDelete, useLanguageUpdate } from "../api";
import { useLanguageDialog } from "./languages-dialog";
import { useLanguagesQuery } from "@/api";
import { useConfirm } from "@/components/confirm-dialog/";
import { Action } from "@/components/list-lemplate/actions-menu";
import ListTemplate from "@/components/list-lemplate/list-template";
import { ColumnConfig } from "@/components/list-lemplate/table-template";

const columnConfigs: ColumnConfig<Language>[] = [
    { name: "name", isSorted: true },
    { name: "iso2", isSorted: false },
];

const LanguagesList = () => {
    const { languages, loading } = useLanguagesQuery();

    const [openConfirm] = useConfirm();
    const [openLanguageDialog] = useLanguageDialog();
    const [createLanguage] = useLanguageCreate();
    const [deleteLanguage] = useLanguageDelete();
    const [updateLanguage] = useLanguageUpdate();

    const menuProps: Action = {
        onDelete: (id: string) =>
            openConfirm({
                title: t("delete confirmation"),
                onConfirm: () =>
                    void deleteLanguage({ variables: { language: { languageId: id } } }),
            }),

        onUpdate: (id: string) =>
            openLanguageDialog({
                title: t("Update language"),
                onConfirm: (formData) =>
                    void updateLanguage({
                        variables: {
                            language: {
                                languageId: id,
                                name: formData.language,
                                iso2: formData.iso2,
                                native_name: formData.native_name,
                            },
                        },
                    }),
                initialValues: {
                    language: languages.find((language) => language.id === id)?.name ?? "",
                    native_name:
                        languages.find((language) => language.id === id)?.native_name ?? "",
                    iso2: languages.find((language) => language.id === id)?.iso2 ?? "",
                },
            }),
    };

    const openLanguage = () =>
        openLanguageDialog({
            title: t("Add language"),
            onConfirm: (formData) =>
                void createLanguage({
                    variables: {
                        language: {
                            name: formData.language,
                            iso2: formData.iso2,
                            native_name: formData.native_name,
                        },
                    },
                }),

            initialValues: { language: "", native_name: "", iso2: "" },
        });

    return (
        <ListTemplate
            pageName={t("language")}
            onButtonClick={openLanguage}
            menuProps={menuProps}
            columnConfigs={columnConfigs}
            displayData={languages}
            loading={loading}
        />
    );
};

export default LanguagesList;
