import { useTranslation } from "react-i18next";
import { Flex, Spin } from "antd";
import { useCvById, useCvUpdate } from "@/modules/cvs/api";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { FormTextarea } from "@/components/form-textarea";
import { FormSubmitButton } from "@/components/form-submit-button";
import { CvDetailsSchemaType, getCvDetailsSchema } from "@/modules/cvs/components/details/schemas";
import styles from "@/modules/cvs/components/details/details.module.css";

interface DetailsProps {
    cvId: string;
    currentUserEmail: string;
}

const Details = ({ cvId, currentUserEmail }: DetailsProps) => {
    const { t } = useTranslation();

    const { data: cvData, loading: loadingCv } = useCvById(cvId);
    const [updateCv, { loading: updatingCv }] = useCvUpdate();

    const isDisabled = Boolean(cvData && currentUserEmail !== cvData.cv.user.email);

    const handleSubmit = (values: CvDetailsSchemaType) => {
        void updateCv({
            variables: {
                cv: {
                    cvId,
                    name: values.name,
                    education: values.education,
                    description: values.description,
                },
            },
        });
    };

    if (loadingCv) return <Spin tip="Loading" size="large" />;

    return (
        <Flex className={styles.cv_details_form_wrapper}>
            <Form
                className={styles.cv_details_form}
                schema={getCvDetailsSchema()}
                onSubmit={handleSubmit}
                defaultValues={{
                    name: cvData?.cv.name ?? "",
                    education: cvData?.cv.education ?? "",
                    description: cvData?.cv.description ?? "",
                }}
            >
                <FormTextField name={"name"} label={t("Name")} size="large" readOnly={isDisabled} />
                <FormTextField
                    name={"education"}
                    label={t("Education")}
                    size="large"
                    readOnly={isDisabled}
                />
                <FormTextarea
                    className={styles.cv_details_form_textarea}
                    name={"description"}
                    label={t("Description")}
                    rows={4}
                    readOnly={isDisabled}
                />
                {!isDisabled && (
                    <FormSubmitButton
                        disableIfNotDirty
                        type="primary"
                        className={styles.cv_details_submit_button}
                        loading={updatingCv}
                        size="large"
                    >
                        {t("update")}
                    </FormSubmitButton>
                )}
            </Form>
        </Flex>
    );
};

export default Details;
