import { Button, Flex } from "antd";
import { LanguageProficiency, Proficiency } from "cv-graphql";
import classNames from "classnames";

import styles from "./item.module.scss";

interface LanguagesListItem {
    language: LanguageProficiency;
    handleLanguageSelect: (language: LanguageProficiency) => void;
}

const LanguagesListItem = ({ language, handleLanguageSelect }: LanguagesListItem) => {
    return (
        <Button
            type="text"
            className={styles.itemWrapper}
            onClick={() => {
                handleLanguageSelect(language);
            }}
        >
            <Flex gap="2rem" className={styles.item}>
                <span
                    className={classNames({
                        [styles.langInt]:
                            language.proficiency === Proficiency.B1 ||
                            language.proficiency === Proficiency.B2,
                        [styles.langAdv]:
                            language.proficiency === Proficiency.C1 ||
                            language.proficiency === Proficiency.C2,
                        [styles.langNative]: language.proficiency === Proficiency.Native,
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
