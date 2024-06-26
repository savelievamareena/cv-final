import { useCallback } from "react";
import { useDeleteUserLanguage } from "../../api";
import { BulkDelete } from "@/components/bulk-delete";

interface LanguagesDeleteFooterProps {
    userId: string;
}

const LanguagesDeleteFooter = ({ userId }: LanguagesDeleteFooterProps) => {
    const [deleteMutation] = useDeleteUserLanguage();

    const handler = useCallback(
        (items: string[]) => {
            return deleteMutation({ variables: { language: { userId, name: items } } });
        },
        [deleteMutation]
    );

    return <BulkDelete onDelete={handler} />;
};

export default LanguagesDeleteFooter;
