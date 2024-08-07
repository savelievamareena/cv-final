import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Spin } from "antd";
import { LanguageProficiency, Proficiency } from "cv-graphql";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCreateUserLanguage, useUpdateUserLanguage, useUserLanguages } from "../../api";
import { useLanguagesDialog } from "../languages-dialog";
import { LanguagesFormSchemaType } from "../schemas/languages";
import { LanguagesListItem } from "./item";

import styles from "./languages-list.module.scss";

interface LanguagesListProps {
    userId: string;
    canEdit: boolean;
}

const LanguagesList = ({ userId, canEdit }: LanguagesListProps) => {
    const { t } = useTranslation();

    const { data, loading } = useUserLanguages({ userId });

    const handleLanguageSelected = (lang: LanguageProficiency) => {
        updateLanguage(lang);
    };

    const [openLanguageDialog] = useLanguagesDialog();

    const [updateMutation, { loading: loadingUpdate }] = useUpdateUserLanguage();
    const [createMutation, { loading: loadingAdd }] = useCreateUserLanguage();

    const existingLanguageLabels = useMemo(
        () => (data ? data?.profile.languages.map((item) => item.name) : []),
        [data]
    );

    if (!loading && !data?.profile?.languages?.length) {
        return <Flex justify="center">{t("languages.noLanguages")}</Flex>;
    }

    if (loading) return <Spin fullscreen size="large" />;

    const addLanguage = () =>
        openLanguageDialog({
            title: t("userLanguages.addLanguage"),
            onConfirm: async ({ name, proficiency }: LanguagesFormSchemaType) => {
                await createMutation({
                    variables: {
                        language: {
                            userId,
                            name,
                            proficiency: proficiency as Proficiency,
                        },
                    },
                });
            },
            userId,
            existingLanguages: existingLanguageLabels,
            initialValues: {
                name: "",
                proficiency: "",
            },
            isSubmitting: loadingAdd,
        });

    const updateLanguage = (selectedLanguage: LanguageProficiency) =>
        openLanguageDialog({
            title: t("userLanguages.updateLanguage"),
            onConfirm: async ({ name, proficiency }: LanguagesFormSchemaType) => {
                await updateMutation({
                    variables: {
                        language: {
                            userId,
                            name,
                            proficiency: proficiency as Proficiency,
                        },
                    },
                });
            },
            userId,
            selectedLanguage,
            existingLanguages: existingLanguageLabels,
            initialValues: {
                name: selectedLanguage.name,
                proficiency: selectedLanguage.proficiency,
            },
            isSubmitting: loadingUpdate,
        });

    return (
        <Flex vertical className={styles.list}>
            {canEdit && (
                <Button size={"large"} type="text" onClick={addLanguage}>
                    <PlusOutlined />
                    {t("userLanguages.addLanguage")}
                </Button>
            )}
            {data && (
                <Flex gap="small" wrap>
                    {data.profile.languages.map((item) => {
                        return (
                            <LanguagesListItem
                                key={item.name}
                                language={item}
                                handleLanguageSelect={handleLanguageSelected}
                                canEdit={canEdit}
                            />
                        );
                    })}
                </Flex>
            )}
        </Flex>
    );
};

export default LanguagesList;
