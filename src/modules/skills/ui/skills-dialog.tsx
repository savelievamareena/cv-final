import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useSkillCategoriesQuery } from "../api/get-skill-catigories-query";
import { getSkillFormSchema, SkillFormSchemaType } from "../shemas/skills";
import { BaseDialog } from "@/components/base-dialog/";
import { Form } from "@/components/form";
import { FormSelect } from "@/components/form-select";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormTextField } from "@/components/form-text-field";
import { mapStringsToSelectOptions } from "@/helpers/convert/maps";
import { createDialogHook } from "@/helpers/dialog/create-dialog";

interface SkillDialogProps {
    title: string;
    onConfirm: (formData: SkillFormSchemaType) => void;
    onClose: () => void;
    initialValues: SkillFormSchemaType;
}

const SkillDialog = ({ title, onConfirm, onClose, initialValues }: SkillDialogProps) => {
    const { t } = useTranslation();

    const { skillCategories } = useSkillCategoriesQuery();

    const handleConfirm = (formData: SkillFormSchemaType) => {
        onConfirm(formData);
        onClose();
    };

    const selectOptions = mapStringsToSelectOptions(skillCategories);

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                onSubmit={handleConfirm}
                defaultValues={initialValues}
                schema={getSkillFormSchema()}
            >
                <FormTextField type="text" label={t("skills.skill")} name="skill" />
                <FormSelect
                    name="category"
                    label={t("skills.category")}
                    loading={false}
                    options={selectOptions}
                />
                <Button htmlType="button" onClick={onClose}>
                    {t("cancel")}
                </Button>
                <FormSubmitButton disableIfNotDirty>{t("submit")}</FormSubmitButton>
            </Form>
        </BaseDialog>
    );
};

export const useSkillDialog = createDialogHook<SkillDialogProps>((props) => (
    <SkillDialog {...props} />
));
