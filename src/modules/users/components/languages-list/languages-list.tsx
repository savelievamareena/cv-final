import { LanguageProficiency, Proficiency } from "cv-graphql";
import { useTranslation } from "react-i18next";
import { Button, Flex, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateUserLanguage, useUpdateUserLanguage, useUserLanguages } from "../../api";

import styles from "./languages-list.module.scss";
import { LanguagesListItem } from "./item";
import { useLanguagesDialog } from "../languages-dialog";
import { LanguagesFormSchemaType } from "../schemas/languages";
import { useCallback, useMemo } from "react";

interface SkillProps {
    userId: string;
    canEdit: boolean;
}

const LanguagesList = ({ userId, canEdit }: SkillProps) => {
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

    const addLanguage = useCallback(
        () =>
            openLanguageDialog({
                title: t("languages.addLanguage"),
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
            }),
        [openLanguageDialog, userId, loadingAdd, existingLanguageLabels]
    );

    const updateLanguage = useCallback(
        (selectedLanguage: LanguageProficiency) =>
            openLanguageDialog({
                title: t("languages.updateLanguage"),
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
            }),
        [openLanguageDialog, userId, loadingUpdate, existingLanguageLabels]
    );

    if (loading) return <Spin size="large" />;

    return (
        <Flex vertical className={styles.list}>
            {canEdit ? (
                <Button size={"large"} type="text" onClick={addLanguage}>
                    <PlusOutlined />
                    {t("languages.addLanguage")}
                </Button>
            ) : null}
            {data && (
                <Flex gap="small" wrap>
                    {data.profile.languages.map((item) => {
                        return (
                            <LanguagesListItem
                                key={item.name}
                                language={item}
                                handleLanguageSelect={handleLanguageSelected}
                            />
                        );
                    })}
                </Flex>
            )}
        </Flex>
    );
};

export default LanguagesList;
