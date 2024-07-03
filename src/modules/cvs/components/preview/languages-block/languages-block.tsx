import { Flex } from "antd";
import { FullsizeLoader } from "@/components/fullsize-loader";
import { useUserLanguages } from "@/modules/users/api";

interface LanguagesBlockProps {
    userId: string;
}

const LanguagesBlock = ({ userId }: LanguagesBlockProps) => {
    const { data: langData, loading: langLoading } = useUserLanguages({ userId });

    if (langLoading) return <FullsizeLoader />;

    return (
        <Flex vertical>
            {langData?.profile?.languages.map((lang) => {
                return (
                    <div key={lang.name}>
                        {lang.name} &mdash; {lang.proficiency}
                    </div>
                );
            })}
        </Flex>
    );
};

export default LanguagesBlock;
