import { Profile, User } from "cv-graphql";

import { Form } from "@/components/form";
import { profileFormSchema } from "../schemas";
import { FormTextField } from "@/components/form-text-field";
import { FormSelect } from "@/components/form-select";
import { FormSubmitButton } from "@/components/form-submit-button/form-submit-button";
import { useUpdateProfile, useUpdateUser, useDepartments, usePositions } from "../../api";

interface ProfileFormProps {
    profile: Profile;
    user: User;
    canEdit: boolean;
}

export const ProfileForm = ({ user, profile, canEdit }: ProfileFormProps) => {
    const { data: positionsData, loading: loadingPositions } = usePositions();
    const { data: departmentsData, loading: loadingDepartments } = useDepartments();

    const departmentOptions = departmentsData?.departments.map(({ id, name }) => ({
        value: id,
        label: <span>{name}</span>,
    }));
    const positionOptions = positionsData?.positions.map(({ id, name }) => ({
        value: id,
        label: <span>{name}</span>,
    }));

    const [updateProfileData, { loading: loadingProfileUpdate }] = useUpdateProfile();
    const [updateUserData, { loading: loadingUserUpdate }] = useUpdateUser();

    return (
        <Form
            disabled={!canEdit || loadingUserUpdate || loadingProfileUpdate}
            defaultValues={{
                firstName: profile.first_name ?? "",
                lastName: profile.last_name ?? "",
                department: user.department?.id ?? "",
                position: user.position?.id ?? "",
            }}
            schema={profileFormSchema()}
            onSubmit={async (data) => {
                return await Promise.all([
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
                ]);
            }}
        >
            <FormTextField name='firstName' label='firstName' />
            <FormTextField name='lastName' label='lastName' />
            <FormSelect
                name='department'
                label='department'
                loading={loadingDepartments}
                options={departmentOptions}
            />
            <FormSelect
                name='position'
                label='position'
                loading={loadingPositions}
                options={positionOptions}
            />
            {canEdit && <FormSubmitButton disableIfNotDirty>Submit</FormSubmitButton>}
        </Form>
    );
};
