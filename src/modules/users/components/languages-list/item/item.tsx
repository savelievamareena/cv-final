import { Button, Flex } from "antd";
import classNames from "classnames";
import { LanguageProficiency } from "cv-graphql";

import { BulkDeleteButton } from "@/components/bulk-delete-button";
import { bulkDeleteService, useBulkDeleteItemIds } from "@/services/bulk-delete-service";
import styles from "./item.module.scss";

interface LanguagesListItemProps {
    language: LanguageProficiency;
    handleLanguageSelect: (language: LanguageProficiency) => void;
    canEdit: boolean;
}

const LanguagesListItem = ({ language, handleLanguageSelect, canEdit }: LanguagesListItemProps) => {
    const selectedItems = useBulkDeleteItemIds();

    const isSelected = selectedItems.includes(language.name);

    return (
        <div className={styles.wrapper}>
            <Button
                type="text"
                className={classNames(styles.itemWrapper, {
                    [styles.itemWrapper_selected]: isSelected,
                })}
                onClick={() => {
                    if (isSelected) {
                        bulkDeleteService.handleItemId(language.name);
                        return;
                    }
                    handleLanguageSelect(language);
                }}
                disabled={!canEdit}
            >
                <Flex className={styles.item}>
                    <span
                        className={classNames({
                            [styles[`lang_${language.proficiency}`]]: true,
                        })}
                    >
                        {language.proficiency}
                    </span>
                    <span className={styles.name}>{language.name}</span>
                </Flex>
            </Button>
            {canEdit && (
                <BulkDeleteButton
                    isSelected={isSelected}
                    item={language.name}
                    className={styles.deleteButton}
                    disabled={!canEdit}
                />
            )}
        </div>
    );
};

export default LanguagesListItem;
