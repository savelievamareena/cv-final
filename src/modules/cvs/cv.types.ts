import { Mastery, Skill, SkillMastery } from "cv-graphql";
import { CvResult } from "@/modules/cvs/api/get-cv-by-id-query";

export interface Cv {
    user: {
        email: string;
    };
    name: string;
    education: string;
    description: string;
    skills: Skill[];
}

export interface GetUserEmailData {
    cv: Cv;
}

export interface GetUserEmailVars {
    cvId: string;
}

export interface CvProps {
    cvId: string;
    cvData: CvResult | undefined;
    loadingCv: boolean;
}

export type SkillsByCategory = Record<Mastery, SkillMastery[]>;
