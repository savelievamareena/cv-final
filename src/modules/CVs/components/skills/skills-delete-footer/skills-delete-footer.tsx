import { useCallback } from "react";
import { useDeleteCvSkill } from "@/api/delete-cv-skill-mutation";
import { BulkDelete } from "@/components/bulk-delete";

interface SkillsDeleteFooterProps {
    cvId: string;
}

const SkillsDeleteFooter = ({ cvId }: SkillsDeleteFooterProps) => {
    const [deleteMutation] = useDeleteCvSkill();

    const handler = useCallback(
        (items: string[]) => {
            return deleteMutation({ variables: { skill: { cvId, name: items } } });
        },
        [deleteMutation]
    );

    return <BulkDelete onDelete={handler} />;
};

export default SkillsDeleteFooter;
