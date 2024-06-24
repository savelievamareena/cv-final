import { useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Flex } from "antd";
import { routes } from "@/router";
import { Form } from "@/components/form";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "@/components/base-dialog/";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormSelect } from "@/components/form-select";
import { useSkillCategories } from "@/api/get-skills-categories-query";
import { useDeleteCvSkill } from "@/api/delete-cv-skill-mutation";
import { useSkillFormOptions, useFilterSkillNames } from "@/hooks/skills";
import { addSkillSchema, AddSkillSchemaType } from "@/modules/cvs/components/skills-dialog/schemas";
import { SkillsDialogProps } from "@/modules/skills/skills.types";
import { FormHandle } from "@/components/form/form.types";

const SkillsDialog = ({
    title,
    onConfirm,
    onClose,
    initialValues,
    skillsData,
    existingSkillsOnPage,
}: SkillsDialogProps) => {
    const { t } = useTranslation();
    const { cvId } = useParams<{ cvId: string }>();
    const formRef = useRef<FormHandle<AddSkillSchemaType>>(null);

    const { data: categoriesData } = useSkillCategories();
    const [deleteMutation, { loading: deleteLoading }] = useDeleteCvSkill();

    const skillNamesToShow = useFilterSkillNames(skillsData, existingSkillsOnPage);
    const { skillsOptions, categoriesOptions, masteryOptions } = useSkillFormOptions(
        skillNamesToShow,
        categoriesData
    );

    if (!cvId) {
        return <Navigate to={routes.auth.root} replace />;
    }

    const handleDelete = () => {
        void deleteMutation({
            variables: {
                skill: {
                    cvId,
                    name: initialValues.name ? [initialValues.name] : [],
                },
            },
        });
        onClose();
    };

    const handleConfirm = (formData: AddSkillSchemaType) => {
        onConfirm(formData);
        onClose();
    };

    const handleSkillChange = (value: string) => {
        const skillObjSelected = skillsData?.skills.filter((skill) => skill.name === value);

        if (skillObjSelected) {
            const selectedCategory = skillObjSelected[0].category;
            formRef.current?.setValue("category", selectedCategory ?? "");
        }
    };

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                ref={formRef}
                schema={addSkillSchema()}
                onSubmit={handleConfirm}
                defaultValues={initialValues}
            >
                <FormSelect
                    name="name"
                    label={t("skills.name")}
                    options={skillsOptions}
                    onChange={handleSkillChange}
                    size="large"
                    disabled={!!initialValues.name}
                />
                <FormSelect
                    name="category"
                    label={t("skills.category")}
                    options={categoriesOptions}
                    size="large"
                    disabled
                />
                <FormSelect
                    name="mastery"
                    label={t("skills.masteryLevel")}
                    options={masteryOptions}
                    placeholder={"Mastery"}
                    size="large"
                />
                <Flex justify="flex-end" gap={10}>
                    {initialValues.name && (
                        <Button htmlType="button" onClick={handleDelete} disabled={deleteLoading}>
                            {t("delete")}
                        </Button>
                    )}
                    <FormSubmitButton disableIfNotDirty type="primary">
                        {t("confirm")}
                    </FormSubmitButton>
                </Flex>
            </Form>
        </BaseDialog>
    );
};

export const useAddSkill = createDialogHook<SkillsDialogProps>((props) => (
    <SkillsDialog {...props} />
));
