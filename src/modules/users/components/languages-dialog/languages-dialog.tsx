import { Button, Flex } from "antd";
import { LanguageProficiency, Proficiency } from "cv-graphql";
import { useTranslation } from "react-i18next";

import { LanguagesFormSchemaType, languagesFormSchema } from "../schemas/languages";
import { useLanguagesQuery } from "@/api";
import { BaseDialog } from "@/components/base-dialog/";
import { Form } from "@/components/form";
import { FormSelect } from "@/components/form-select";
import { FormSubmitButton } from "@/components/form-submit-button";
import { createDialogHook } from "@/helpers/dialog/create-dialog";

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

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                schema={languagesFormSchema()}
                onSubmit={handleConfirm}
                defaultValues={initialValues}
                disabled={isSubmitting}
            >
                <FormSelect
                    name="name"
                    label={t("userLanguages.fieldLabels.name")}
                    options={languageOptions}
                    size="large"
                    disabled={!!selectedLanguage}
                    loading={loading}
                />
                <FormSelect
                    name="proficiency"
                    label={t("userLanguages.fieldLabels.proficiency")}
                    options={proficiencyOptions}
                    size="large"
                />
                <Flex justify="flex-end" gap={10}>
                    <Button htmlType="button" onClick={onClose}>
                        {t("cancel")}
                    </Button>
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
