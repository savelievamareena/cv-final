import { useParams } from "react-router-dom";
import { Col, Row, Spin, Typography } from "antd";
import { SafetyOutlined } from "@ant-design/icons";
import { UserRole } from "cv-graphql";
import { useTranslation } from "react-i18next";

import i18n from "@/i18n";
import { ProfileForm } from "../profile-form";
import { AvatarUpload } from "../avatar-upload";
import { ProfileAvatar } from "../profile-avatar";
import { useAuthUser } from "@/services/auth-service";
import { RouteParams } from "@/router";
import { useProfile, useUser } from "../../api";

import styles from "./profile-content.module.scss";

const ProfileContent = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const { t } = useTranslation();

    const { loading: loadingProfile, data: profileData } = useProfile({ userId: userId! });
    const { loading: loadingUser, data: userData } = useUser({ userId: userId! });

    const loading = loadingProfile || loadingUser;

    const hasData = !!profileData?.profile && !!userData?.user;

    const currUser = useAuthUser();

    const canEdit = currUser?.role === UserRole.Admin || currUser?.id === userId;

    return (
        <>
            {loading && !hasData && <Spin />}
            {hasData && (
                <div className={styles.wrapper}>
                    <Row gutter={[16, 8]}>
                        <Col span={12}>
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
                                    {t("profile.info.createdAt", {
                                        createdAt: new Date(
                                            +profileData.profile.created_at
                                        ).toLocaleDateString(i18n.language, {
                                            weekday: "short",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }),
                                    })}
                                </span>
                            </Typography>
                        </Col>
                        <Col span={12}>
                            {hasData && canEdit && <AvatarUpload user={userData.user} />}
                        </Col>
                        <Col span={24}>
                            <ProfileForm
                                canEdit={canEdit}
                                user={userData.user}
                                profile={profileData.profile}
                            />
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
};

export default ProfileContent;
