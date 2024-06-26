import { Button, Flex } from "antd";
import classNames from "classnames";
import { LanguageProficiency } from "cv-graphql";

import styles from "./item.module.scss";
import { BulkDeleteButton } from "@/components/bulk-delete-button";
import { bulkDeleteService, useBulkDeleteItemIds } from "@/services/bulk-delete-service";

interface LanguagesListItemProps {
    language: LanguageProficiency;
    handleLanguageSelect: (language: LanguageProficiency) => void;
    canEdit: boolean;
}

const LanguagesListItem = ({ language, handleLanguageSelect, canEdit }: LanguagesListItemProps) => {
    const selectedItems = useBulkDeleteItemIds();

    const isSelected = selectedItems.includes(language.name);

    return (
        <Button
            type="text"
            className={classNames(styles.itemWrapper, {
                [styles.itemWrapper_selected]: isSelected,
            })}
            onClick={
                canEdit
                    ? () => {
                          if (isSelected) {
                              bulkDeleteService.handleItemId(language.name);
                              return;
                          }
                          handleLanguageSelect(language);
                      }
                    : undefined
            }
        >
            <Flex gap="2rem" className={styles.item}>
                <span
                    className={classNames({
                        [styles[`lang_${language.proficiency}`]]: true,
                    })}
                >
                    {language.proficiency}
                </span>
                <span className={styles.name}>{language.name}</span>
                {canEdit && <BulkDeleteButton isSelected={isSelected} item={language.name} />}
            </Flex>
        </Button>
    );
};

export default LanguagesListItem;
