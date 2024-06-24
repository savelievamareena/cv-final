import { Navigate, useParams } from "react-router-dom";
import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";
import { Flex, Spin } from "antd";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { FormTextarea } from "@/components/form-textarea";
import { useTranslation } from "react-i18next";
import { FormSubmitButton } from "@/components/form-submit-button";
import { CvDetailsSchemaType, getCvDetailsSchema } from "@/modules/CVVSs/schemas";
import { useCvUpdate, useCvById } from "@/modules/CVVSs/api";
import styles from "./cv-details-form.module.css";

const CvDetailsForm = () => {
    const currentUser = useAuthUser();

    if (!currentUser) {
        return <Navigate to={routes.auth.root} replace />;
    }

    const { t } = useTranslation();
    const { cvId } = useParams<{ cvId: string }>();

    if (!cvId) {
        return <Navigate to={routes.auth.root} replace />;
    }

    const { data: cvData, loading: loadingCv } = useCvById(cvId);
    const [updateCv, { loading: updatingCv }] = useCvUpdate();

    const isDisabled = Boolean(cvData && currentUser.email !== cvData.cv.user.email);

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

export default CvDetailsForm;
