import { useParams } from "react-router-dom";
import { RouteParams } from "@/router";
import { useProfile, useUser } from "../../api";

import { ProfileForm } from "../profile-form/profile-form";
import { AvatarUpload } from "../avatar-upload";
import { ProfileAvatar } from "../profile-avatar";
import { useAuthUser } from "@/services/auth-service";
import { UserRole } from "cv-graphql";
import { SafetyOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";

export const ProfileContent = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const { loading: loadingProfile, data: profileData } = useProfile({ userId: userId! });
    const { loading: loadingUser, data: userData } = useUser({ userId: userId! });

    const loading = loadingProfile || loadingUser;

    const hasData = !!profileData?.profile && !!userData?.user;

    const currUser = useAuthUser();

    const canEdit = currUser?.role === UserRole.Admin || currUser?.id === userId;

    return (
        <>
            {loading && !hasData && <div>Loading</div>}
            {hasData && (
                <>
                    <Row justify="space-between" gutter={16}>
                        <Col span={"12rem"}>
                            <ProfileAvatar
                                canEdit={canEdit}
                                user={userData.user}
                                profile={profileData.profile}
                            />
                            <Typography>
                                <span>{userData.user.email}</span>
                                {userData.user.is_verified && <SafetyOutlined />}
                            </Typography>
                            <Typography>{profileData.profile.full_name}</Typography>
                            <Typography>
                                <span>
                                    A member since{" "}
                                    {new Date(+profileData.profile.created_at).toUTCString()}
                                </span>
                            </Typography>
                        </Col>
                        <Col span={"12rem"}>
                            {hasData && canEdit && <AvatarUpload user={userData.user} />}
                        </Col>
                    </Row>
                    {hasData && (
                        <ProfileForm
                            canEdit={canEdit}
                            user={userData.user}
                            profile={profileData.profile}
                        />
                    )}
                </>
            )}
        </>
    );
};
