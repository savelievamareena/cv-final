import { useCallback } from "react";
import { BulkDeleteFooter } from "@/components/bulk-delete-footer";
import { useDeleteUserLanguage } from "../../api";

interface LanguagesDeleteFooterProps {
    userId: string;
}

const LanguagesDeleteFooter = ({ userId }: LanguagesDeleteFooterProps) => {
    const [deleteMutation, { loading }] = useDeleteUserLanguage();

    const handler = useCallback(
        (items: string[]) => {
            return deleteMutation({ variables: { language: { userId, name: items } } });
        },
        [deleteMutation]
    );

    return <BulkDeleteFooter onDelete={handler} loadingState={loading} />;
};

export default LanguagesDeleteFooter;
