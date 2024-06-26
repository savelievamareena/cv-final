import { Button, Flex } from "antd";
import { Mastery, SkillMastery } from "cv-graphql";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import { useDeleteCvSkill } from "@/api/delete-cv-skill-mutation";
import { useSkillCategories } from "@/api/get-skills-categories-query";
import { BaseDialog } from "@/components/base-dialog/";
import { Form } from "@/components/form";
import { FormHandle } from "@/components/form/form.types";
import { FormSelect } from "@/components/form-select";
import { FormSubmitButton } from "@/components/form-submit-button";
import { SkillsCategoryTranslation } from "@/constants";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { addSkillSchema, AddSkillSchemaType } from "@/modules/cvs/components/skills-dialog/schemas";
import { SkillsResult } from "@/modules/skills/api/skills.types";
import { routes } from "@/router";

interface Option {
    value: string;
    label: string;
}

interface SkillsDialogProps {
    title: string;
    onConfirm: (formData: AddSkillSchemaType) => void;
    onClose: () => void;
    initialValues: AddSkillSchemaType;
    skillsData: SkillsResult | undefined;
    existingSkillsOnPage: SkillMastery[] | undefined;
}

type InputName = keyof AddSkillSchemaType;

const SkillsDialog = ({
    title,
    onConfirm,
    onClose,
    initialValues,
    skillsData,
    existingSkillsOnPage,
}: SkillsDialogProps) => {
    const { cvId } = useParams<{ cvId: string }>();
    const formRef = useRef<FormHandle<AddSkillSchemaType>>(null);

    if (!cvId) {
        return <Navigate to={routes.auth.root} replace />;
    }
    const { t } = useTranslation();
    const { data: categoriesData } = useSkillCategories();

    const handleSetCategoryValue = (name: InputName, value: string) => {
        if (formRef.current) {
            formRef.current.setValue(name, value);
        }
    };

    const handleConfirm = (formData: AddSkillSchemaType) => {
        onConfirm(formData);
        onClose();
    };

    const skillNamesToShow = useMemo(() => {
        if (!skillsData || !existingSkillsOnPage) return [];
        const existingSkillsNames = new Set(existingSkillsOnPage.map((skill) => skill.name));
        return skillsData.skills.filter((skill) => !existingSkillsNames.has(skill.name));
    }, [skillsData, existingSkillsOnPage]);

    const skillsOptions: Option[] = skillNamesToShow.map((skill) => ({
        value: skill.name,
        label: skill.name,
    }));

    const categoriesOptions: Option[] = categoriesData
        ? categoriesData.skillCategories.map((category) => {
              const categoryName = category
                  ? `skills.categories.${SkillsCategoryTranslation[category]}`
                  : `skills.categories.other`;
              return {
                  value: category,
                  label: t(categoryName),
              };
          })
        : [];

    const masteryValues = Object.values(Mastery);
    const masteryOptions: Option[] = masteryValues.map((mastery) => {
        return {
            value: mastery,
            label: t(`skills.mastery.${mastery.toLowerCase()}`),
        };
    });

    const [deleteMutation, { loading: deleteLoading }] = useDeleteCvSkill();

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

    const handleSkillChange = (value: string) => {
        const skillObjSelected = skillsData?.skills.filter((skill) => skill.name === value);

        if (skillObjSelected) {
            const selectedCategory = skillObjSelected[0].category;
            if (selectedCategory && selectedCategory !== "") {
                handleSetCategoryValue("category", selectedCategory);
            }
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
