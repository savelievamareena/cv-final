import { useCallback } from "react";
import { useDeleteCvSkill } from "@/api/delete-cv-skill-mutation";
import { BulkDeleteFooter } from "@/components/bulk-delete-footer";

interface SkillsDeleteFooterProps {
    cvId: string;
}

const SkillsDeleteFooter = ({ cvId }: SkillsDeleteFooterProps) => {
    const [deleteMutation, { loading }] = useDeleteCvSkill();

    const handler = useCallback(
        (items: string[]) => {
            return deleteMutation({ variables: { skill: { cvId, name: items } } });
        },
        [deleteMutation]
    );

    return <BulkDeleteFooter onDelete={handler} loadingState={loading} />;
};

export default SkillsDeleteFooter;
