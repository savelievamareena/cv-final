import { Profile, User } from "cv-graphql";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";

import { Form } from "@/components/form";
import { profileFormSchema } from "../schemas";
import { FormTextField } from "@/components/form-text-field";
import { FormSelect } from "@/components/form-select";
import { FormSubmitButton } from "@/components/form-submit-button/form-submit-button";
import { useProfileUpdate, useUserUpdate } from "../../api";
import { useDepartmentsQuery, usePositionsQuery } from "@/api";

import styles from "./profile-form.module.scss";

interface ProfileFormProps {
    profile: Profile;
    user: User;
    canEdit: boolean;
}

const ProfileForm = ({ user, profile, canEdit }: ProfileFormProps) => {
    const { t } = useTranslation();

    const { data: positionsData, loading: loadingPositions } = usePositionsQuery();
    const { data: departmentsData, loading: loadingDepartments } = useDepartmentsQuery();

    const departmentOptions = departmentsData?.departments.map(({ id, name }) => ({
        value: id,
        label: <span>{name}</span>,
    }));
    const positionOptions = positionsData?.positions.map(({ id, name }) => ({
        value: id,
        label: <span>{name}</span>,
    }));

    const [updateProfileData, { loading: loadingProfileUpdate }] = useProfileUpdate();
    const [updateUserData, { loading: loadingUserUpdate }] = useUserUpdate();

    return (
        <Form
            className={styles.form}
            disabled={!canEdit || loadingUserUpdate || loadingProfileUpdate}
            defaultValues={{
                firstName: profile.first_name ?? "",
                lastName: profile.last_name ?? "",
                department: user.department?.id ?? "",
                position: user.position?.id ?? "",
            }}
            schema={profileFormSchema()}
            onSubmit={(data) =>
                Promise.all([
                    updateProfileData({
                        variables: {
                            profile: {
                                userId: user.id,
                                first_name: data.firstName,
                                last_name: data.lastName,
                            },
                        },
                    }),
                    updateUserData({
                        variables: {
                            user: {
                                userId: user.id,
                                departmentId: data.department,
                                positionId: data.position,
                            },
                        },
                    }),
                ])
            }
        >
            <Row gutter={[16, 8]}>
                <Col span={12}>
                    <FormTextField
                        name="firstName"
                        label={t("profile.form.fieldLabels.firstName")}
                        placeholder={t("profile.form.fieldLabels.firstName")}
                    />
                </Col>
                <Col span={12}>
                    <FormTextField
                        name="lastName"
                        label={t("profile.form.fieldLabels.lastName")}
                        placeholder={t("profile.form.fieldLabels.lastName")}
                    />
                </Col>
                <Col span={12}>
                    <FormSelect
                        name="department"
                        label={t("profile.form.fieldLabels.department")}
                        loading={loadingDepartments}
                        options={departmentOptions}
                    />
                </Col>
                <Col span={12}>
                    <FormSelect
                        name="position"
                        label={t("profile.form.fieldLabels.position")}
                        loading={loadingPositions}
                        options={positionOptions}
                    />
                </Col>
                {canEdit && (
                    <Col xs={{ span: 24 }} md={{ offset: 12, span: 12 }}>
                        <FormSubmitButton className={styles.submitButton} disableIfNotDirty>
                            {t("update")}
                        </FormSubmitButton>
                    </Col>
                )}
            </Row>
        </Form>
    );
};

export default ProfileForm;