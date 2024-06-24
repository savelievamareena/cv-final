import { Button, Flex, Progress } from "antd";
import { ProgressProps } from "antd/es/progress";
import { SkillMastery } from "cv-graphql";
import styles from "./progress-bar.module.scss";

export interface SkillProgressBarProps extends ProgressProps {
    skill: SkillMastery;
    handleSkillSelected: (skill: SkillMastery) => void;
}

const ProgressBar = ({ skill, handleSkillSelected, ...props }: SkillProgressBarProps) => {
    return (
        <Button
            type="default"
            className={styles.progress_bar_wrapper}
            onClick={() => {
                handleSkillSelected(skill);
            }}
        >
            <Flex className={styles.progress_bar}>
                <Progress {...props} size="small" showInfo={false} />
            </Flex>
            <span>{skill.name}</span>
        </Button>
    );
};

export default ProgressBar;
