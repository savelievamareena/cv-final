import { LanguageProficiency, Proficiency } from "cv-graphql";
import { useTranslation } from "react-i18next";
import { Button, Flex } from "antd";

import { Form } from "@/components/form";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "@/components/base-dialog/";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormSelect } from "@/components/form-select";
import { useLanguagesQuery } from "@/api";
import { useDeleteUserLanguage } from "../../api";
import { LanguagesFormSchemaType, languagesFormSchema } from "../schemas/languages";

interface LanguagesDialogProps {
    title: string;
    onConfirm: (formData: LanguagesFormSchemaType) => Promise<void>;
    onClose: () => void;
    initialValues?: LanguagesFormSchemaType;
    selectedLanguage?: LanguageProficiency | null;
    existingLanguages: string[];
    isSubmitting: boolean;
    userId: string;
}

const LanguagesDialog = ({
    title,
    onConfirm,
    onClose,
    initialValues,
    selectedLanguage,
    isSubmitting,
    existingLanguages,
    userId,
}: LanguagesDialogProps) => {
    const { t } = useTranslation();

    const { languages, loading } = useLanguagesQuery();

    const handleConfirm = (formData: LanguagesFormSchemaType) => {
        void onConfirm(formData).then(() => {
            onClose();
        });
    };

    const proficiencyOptions = Object.values(Proficiency).map((item) => ({
        label: item,
        value: item,
    }));

    const languageOptions = languages
        .map((item) => ({
            label: item.name,
            value: item.name,
        }))
        .filter((lang) => !existingLanguages.includes(lang.label));

    const [deleteMutation, { loading: deleteLoading }] = useDeleteUserLanguage();

    const handleDelete = () => {
        void deleteMutation({
            variables: {
                language: {
                    userId: userId,
                    name: selectedLanguage?.name ? [selectedLanguage.name] : [],
                },
            },
            onCompleted: () => {
                onClose();
            },
        });
    };

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                schema={languagesFormSchema()}
                onSubmit={handleConfirm}
                defaultValues={initialValues}
                disabled={deleteLoading || isSubmitting}
            >
                <FormSelect
                    name="name"
                    label={t("languages.fieldLabels.name")}
                    options={languageOptions}
                    size="large"
                    disabled={!!selectedLanguage}
                    loading={loading}
                />
                <FormSelect
                    name="proficiency"
                    label={t("languages.fieldLabels.proficiency")}
                    options={proficiencyOptions}
                    size="large"
                />
                <Flex justify="flex-end" gap={10}>
                    {selectedLanguage && (
                        <Button htmlType="button" type="default" onClick={handleDelete}>
                            {t("delete")}
                        </Button>
                    )}
                    <FormSubmitButton disableIfNotDirty type="primary" disabled={isSubmitting}>
                        {t("confirm")}
                    </FormSubmitButton>
                </Flex>
            </Form>
        </BaseDialog>
    );
};

export const useLanguagesDialog = createDialogHook<LanguagesDialogProps>((props) => (
    <LanguagesDialog {...props} />
));
