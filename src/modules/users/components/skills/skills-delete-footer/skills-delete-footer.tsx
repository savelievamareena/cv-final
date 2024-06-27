import { useCallback } from "react";
import { BulkDelete } from "@/components/bulk-delete";
import { useDeleteProfileSkill } from "@/modules/users/api/delete-user-skill-mutation";

interface SkillsDeleteFooterProps {
    userId: string;
}

const SkillsDeleteFooter = ({ userId }: SkillsDeleteFooterProps) => {
    const [deleteMutation] = useDeleteProfileSkill();

    const handler = useCallback(
        (items: string[]) => {
            return deleteMutation({ variables: { skill: { userId, name: items } } });
        },
        [deleteMutation]
    );

    return <BulkDelete onDelete={handler} />;
};

export default SkillsDeleteFooter;
