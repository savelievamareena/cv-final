import { useCallback } from "react";
import { BulkDeleteFooter } from "@/components/bulk-delete-footer";
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

    return <BulkDeleteFooter onDelete={handler} />;
};

export default SkillsDeleteFooter;
