import { Flex } from "antd";
import { CvProject } from "cv-graphql";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import styles from "../preview.module.scss";

interface ProjectsBlockProps {
    projects: CvProject[];
}

const ProjectsBlock = ({ projects }: ProjectsBlockProps) => {
    const { t } = useTranslation();

    return (
        <Flex vertical>
            {projects.map((project) => {
                const parsedStartDate = dayjs(project.start_date);
                if (!parsedStartDate.isValid()) return "";

                const parsedEndDate = dayjs(project.end_date);
                const startDateToShow = parsedStartDate.format("M.YYYY");
                const endDateToShow =
                    parsedEndDate.format("M.YYYY") === "Invalid Date"
                        ? t("projects.tillNow")
                        : parsedEndDate.format("M.YYYY");

                return (
                    <Flex className={styles.project_wrapper} key={project.name}>
                        <Flex className={styles.project_left_col} vertical gap={20}>
                            <div className={styles.project_title}>{project.name.toUpperCase()}</div>
                            <div>{project.description}</div>
                        </Flex>
                        <Flex className={styles.project_right_col} vertical>
                            <Flex vertical>
                                <Flex className={styles.title}>Project Roles</Flex>
                                <Flex>{project.domain}</Flex>
                            </Flex>
                            <Flex vertical>
                                <Flex className={styles.title}>
                                    Responsibilities & achievements
                                </Flex>
                                {project.responsibilities.map((responsibility, index) => {
                                    const isLast = index === project.responsibilities.length - 1;
                                    return (
                                        <span key={index}>
                                            {responsibility}
                                            {!isLast && ", "}
                                        </span>
                                    );
                                })}
                            </Flex>
                            <Flex vertical>
                                <Flex className={styles.title}>Period</Flex>
                                <Flex>
                                    {startDateToShow} &mdash; {endDateToShow}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                );
            })}
        </Flex>
    );
};

export default ProjectsBlock;
