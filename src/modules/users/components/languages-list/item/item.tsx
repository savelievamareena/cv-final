import { Button, Flex } from "antd";
import classNames from "classnames";
import { LanguageProficiency } from "cv-graphql";

import styles from "./item.module.scss";
import { bulkDeleteService } from "@/services/bulk-delete-service";

interface LanguagesListItemProps {
    language: LanguageProficiency;
    handleLanguageSelect: (language: LanguageProficiency) => void;
}

const LanguagesListItem = ({ language, handleLanguageSelect }: LanguagesListItemProps) => {
    return (
        <Button
            type="text"
            className={styles.itemWrapper}
            onClick={() => {
                handleLanguageSelect(language);
            }}
            onContextMenu={(ev) => {
                ev.preventDefault();
                bulkDeleteService.handleItemId(language.name);
            }}
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
            </Flex>
        </Button>
    );
};

export default LanguagesListItem;
