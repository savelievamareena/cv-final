import { Button, Flex, Progress } from "antd";
import { ProgressProps } from "antd/es/progress";
import classNames from "classnames";
import { SkillMastery } from "cv-graphql";
import { BulkDeleteButton } from "../bulk-delete-button";
import styles from "./progress-bar.module.scss";
import { bulkDeleteService, useBulkDeleteItemIds } from "@/services/bulk-delete-service";

export interface SkillProgressBarProps extends ProgressProps {
    skill: SkillMastery;
    handleSkillSelected: (skill: SkillMastery) => void;
    canEdit: boolean;
}

const ProgressBar = ({ skill, handleSkillSelected, canEdit, ...props }: SkillProgressBarProps) => {
    const selectedItems = useBulkDeleteItemIds();

    const isSelected = selectedItems.includes(skill.name);

    return (
        <div className={styles.wrapper}>
            <Button
                type="text"
                className={classNames(styles.progress_bar_wrapper, {
                    [styles.selected]: isSelected,
                })}
                onClick={() => {
                    if (isSelected) {
                        bulkDeleteService.handleItemId(skill.name);
                        return;
                    }

                    handleSkillSelected(skill);
                }}
                disabled={!canEdit}
            >
                <Flex className={styles.progress_bar}>
                    <Progress
                        {...props}
                        percent={isSelected ? 0 : props.percent}
                        size="small"
                        showInfo={false}
                    />
                </Flex>
                <span className={styles.name}>{skill.name}</span>
            </Button>
            {canEdit && (
                <BulkDeleteButton
                    isSelected={isSelected}
                    item={skill.name}
                    className={styles.deleteButton}
                />
            )}
        </div>
    );
};

export default ProgressBar;
