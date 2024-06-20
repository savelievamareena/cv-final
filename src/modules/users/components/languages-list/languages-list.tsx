import { LanguageProficiency } from "cv-graphql";
import { useTranslation } from "react-i18next";
import { Button, Flex, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useUserLanguages } from "../../api";

import styles from "./languages-list.module.scss";
import { LanguagesListItem } from "./item";

interface SkillProps {
    userId: string;
    canEdit: boolean;
}

const LanguagesList = ({ userId, canEdit }: SkillProps) => {
    const { t } = useTranslation();

    const { data, loading } = useUserLanguages({ userId });

    const handleLanguageSelected = ({ name, proficiency }: LanguageProficiency) => {
        console.log(name, proficiency);
    };

    if (loading) return <Spin size="large" />;

    return (
        <Flex vertical className={styles.list}>
            {canEdit ? (
                <Button
                    size={"large"}
                    type="text"
                    onClick={() => {
                        console.log("fuu");
                    }}
                >
                    <PlusOutlined />
                    {t("languages.addLanguage")}
                </Button>
            ) : null}
            {data && (
                <Flex gap="small" wrap>
                    {data.profile.languages.map((item) => {
                        return (
                            <LanguagesListItem
                                key={item.name}
                                language={item}
                                handleLanguageSelect={handleLanguageSelected}
                            />
                        );
                    })}
                </Flex>
            )}
        </Flex>
    );
};

export default LanguagesList;
