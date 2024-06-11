import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "@/components/base-dialog/";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormSelect } from "@/components/form-select";
import { getSkillFormSchema } from "../shemas/skills";
import { useSkillCategoriesQuery } from "../api/get-skill-catigories-query";

interface FormData {
    skill: string;
    category: string;
}
interface SkillDialogProps {
    title: string;
    onConfirm: (formData: FormData) => void;
    onClose: () => void;
    initialValues: { skill: string; category: string };
}
const SkillDialog = ({ title, onConfirm, onClose, initialValues }: SkillDialogProps) => {
    const { t } = useTranslation();
    const { skill, category } = initialValues;

    const { skillCategories } = useSkillCategoriesQuery();

    const handleConfirm = (formData: FormData) => {
        onConfirm(formData);
        onClose();
    };

    interface SelectOption {
        label: string;
        value: string;
    }

    const convertToSelectOptions = (arr: string[]): SelectOption[] => {
        return arr.map((item) => ({
            label: item,
            value: item,
        }));
    };
    const selectOptions = convertToSelectOptions(skillCategories);

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                onSubmit={handleConfirm}
                defaultValues={{ skill, category }}
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

export const useAddSkill = createDialogHook<SkillDialogProps>((props) => (
    <SkillDialog {...props} />
));
