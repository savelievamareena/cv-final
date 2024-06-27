import { useCallback } from "react";
import { useDeleteUserLanguage } from "../../api";
import { BulkDeleteFooter } from "@/components/bulk-delete-footer";

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

    return <BulkDeleteFooter onDelete={handler} />;
};

export default LanguagesDeleteFooter;
