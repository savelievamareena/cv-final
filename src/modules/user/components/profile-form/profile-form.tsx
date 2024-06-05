import { Profile, User } from "cv-graphql";

import { Form } from "@/components/form";
import { profileFormSchema } from "../schemas";
import { FormTextField } from "@/components/form-text-field";
import { FormSelect } from "@/components/form-select";
import { FormSubmitButton } from "@/components/form-submit-button/form-submit-button";
import { useDepartments } from "../../api/departments";
import { usePositions } from "../../api/positions";
import { useUpdateProfile, useUpdateUser } from "../../api";

interface ProfileFormProps {
    profile: Profile;
    user: User;
}

export const ProfileForm = ({ user, profile }: ProfileFormProps) => {
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
            disabled={loadingUserUpdate || loadingProfileUpdate}
            defaultValues={{
                firstName: profile.first_name ?? "",
                lastName: profile.last_name ?? "",
                department: user.department?.id ?? "",
                position: user.position?.id ?? "",
            }}
            schema={profileFormSchema()}
            onSubmit={async (data) => {
                await Promise.all([
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
            <FormSubmitButton>Submit</FormSubmitButton>
        </Form>
    );
};
