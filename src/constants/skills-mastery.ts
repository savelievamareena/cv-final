import { Mastery } from "cv-graphql";
import { MasteryOptions } from "@/modules/cvs/components/cv-skills-container/cv-skills-container.types";

export const SkillsMastery: Record<Mastery, MasteryOptions> = {
    Novice: { percent: 20, color: "#828282" },
    Advanced: { percent: 40, color: "#1992D4" },
    Competent: { percent: 60, color: "#418845" },
    Proficient: { percent: 80, color: "#FEBD18" },
    Expert: { percent: 100, color: "#CA4344" },
};
