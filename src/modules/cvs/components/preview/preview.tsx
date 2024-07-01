import { Flex, Spin } from "antd";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { LanguagesBlock } from "./languages-block";
import styles from "./preview.module.scss";
import { SkillsInfoBlock } from "./skills-info-block";
import { useCvById } from "@/modules/cvs/api";
import { DomainBlock } from "@/modules/cvs/components/preview/domain-block";
import { ProjectsBlock } from "@/modules/cvs/components/preview/projects-block";
import { UserInfoBlock } from "@/modules/cvs/components/preview/user-info-block";

interface PreviewProps {
    cvId: string;
}

const Preview = ({ cvId }: PreviewProps) => {
    const { t } = useTranslation();

    const classesLeftCol = classNames(styles.preview_left_col, styles.preview_col);
    const classesRightCol = classNames(styles.preview_right_col, styles.preview_col);

    const { data: cvData, loading: cvLoading } = useCvById(cvId);
    const userId = cvData?.cv.user.id;

    if (cvLoading || !cvData || !userId) return <Spin size={"large"} />;

    return (
        <Flex className={styles.preview} vertical gap={40}>
            <Flex justify={"space-between"} align={"center"}>
                <UserInfoBlock userId={userId} />
                <Flex>{t("cvs.exportPdf")}</Flex>
            </Flex>
            <Flex className={styles.preview_basic_info}>
                <Flex vertical className={classesLeftCol}>
                    <Flex vertical>
                        <div className={styles.title}>{t("Education")}</div>
                        <div>{cvData?.cv.education}</div>
                    </Flex>
                    <Flex vertical>
                        <div className={styles.title}>{t("userLanguages.langProficiency")}</div>
                        <LanguagesBlock userId={userId} />
                    </Flex>
                    <Flex vertical>
                        <div className={styles.title}>{t("Domains")}</div>
                        <DomainBlock projects={cvData?.cv.projects} />
                    </Flex>
                </Flex>
                <Flex vertical className={classesRightCol}>
                    <Flex vertical>
                        <div className={styles.title}>{cvData?.cv.name}</div>
                        <div>{cvData?.cv.description}</div>
                    </Flex>
                    <SkillsInfoBlock skills={cvData?.cv.skills} />
                </Flex>
            </Flex>
            <Flex vertical>
                <div className={styles.preview_name}>{t("Projects")}</div>
                <ProjectsBlock projects={cvData?.cv.projects} />
            </Flex>
        </Flex>
    );
};

export default Preview;
