import { Button, Flex } from "antd";
import classNames from "classnames";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FullsizeLoader } from "@/components/fullsize-loader";
import { useCvById } from "@/modules/cvs/api";
import { usePdfExport } from "@/modules/cvs/api/export-pdf-mutation.ts";
import { DomainBlock } from "@/modules/cvs/components/preview/domain-block";
import { ProjectsBlock } from "@/modules/cvs/components/preview/projects-block";
import { UserInfoBlock } from "@/modules/cvs/components/preview/user-info-block";
import { prepareHtml } from "@/modules/cvs/helpers/prepare-html";
import { LanguagesBlock } from "./languages-block";
import styles from "./preview.module.scss";
import { SkillsInfoBlock } from "./skills-info-block";

interface PreviewProps {
    cvId: string;
}

const Preview = ({ cvId }: PreviewProps) => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);

    const classesLeftCol = classNames(styles.preview_left_col, styles.preview_col);
    const classesRightCol = classNames(styles.preview_right_col, styles.preview_col);

    const { data: cvData, loading: cvLoading } = useCvById(cvId);
    const [exportPdf, { loading: loadingPdf }] = usePdfExport(cvData?.cv.name);

    if (cvLoading && !cvData) return <FullsizeLoader />;

    if (!cvData) return null;

    const userId = cvData.cv.user.id;

    const handleExportButtonClick = () => {
        if (!ref.current) {
            return;
        }

        void exportPdf({
            variables: {
                pdf: {
                    html: prepareHtml(ref.current, ["body"]),
                    margin: {
                        top: "12mm",
                        bottom: "12mm",
                        left: "12mm",
                        right: "12mm",
                    },
                },
            },
        });
    };

    return (
        <Flex className={styles.preview}>
            <Flex className={styles.preview_content} ref={ref}>
                <Flex justify={"space-between"} align={"center"}>
                    <UserInfoBlock userId={userId} />
                    <Button
                        onClick={handleExportButtonClick}
                        type="primary"
                        disabled={loadingPdf}
                        className={styles.export_button}
                    >
                        {loadingPdf ? t("loading") : t("cvs.exportPdf")}
                    </Button>
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
                {!!cvData?.cv.projects.length && (
                    <Flex vertical>
                        <div className={styles.preview_name}>{t("Projects")}</div>
                        <ProjectsBlock projects={cvData?.cv.projects} />
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default Preview;
