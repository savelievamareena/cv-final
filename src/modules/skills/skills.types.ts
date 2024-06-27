import { SkillMastery } from "cv-graphql";
import { AddSkillSchemaType } from "@/modules/cvs/components/skills-dialog/schemas";
import { SkillsResult } from "@/modules/skills/api/skills.types.ts";

export interface SkillsDialogProps {
    title: string;
    onConfirm: (formData: AddSkillSchemaType) => void;
    onClose: () => void;
    initialValues: AddSkillSchemaType;
    skillsData: SkillsResult | undefined;
    existingSkillsOnPage: SkillMastery[] | undefined;
}
