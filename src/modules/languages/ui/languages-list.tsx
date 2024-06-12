import { Language } from "cv-graphql";
import { t } from "i18next";
import ListTemplate from "@/components/list-lemplate/list-template";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useConfirm } from "@/components/confirm-dialog/";
import { useLanguageCreate, useLanguageDelete, useLanguagesQuery, useLanguageUpdate } from "../api";
import { useAddLanguage } from "./languages-dialog";

const columnConfigs: ColumnConfig<Language>[] = [
    { name: "name", isSorted: true },
    { name: "iso2", isSorted: false },
];

const LanguagesList = () => {
    const { languages, loading } = useLanguagesQuery();

    const [openConfirm] = useConfirm();
    const [openAddLanguage] = useAddLanguage();
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
            openAddLanguage({
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
        openAddLanguage({
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
