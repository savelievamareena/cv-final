import { gql, useQuery } from "@apollo/client";
import { CvProject, SkillMastery } from "cv-graphql";
import { useNotificationContext } from "@/helpers/notification";

export const GET_CV_BY_ID = gql`
    query cv($cvId: ID!) {
        cv(cvId: $cvId) {
            user {
                id
                email
            }
            name
            education
            description
            skills {
                name
                category
                mastery
            }
            projects {
                name
                description
                roles
                responsibilities
                start_date
                end_date
                domain
            }
        }
    }
`;

export interface CvResult {
    cv: {
        user: {
            id: string;
            email: string;
        };
        name: string;
        education: string;
        description: string;
        skills: SkillMastery[];
        projects: CvProject[];
    };
}

interface CvVars {
    cvId: string;
}

export const useCvById = (cvId: string) => {
    const { showNotification } = useNotificationContext();

    return useQuery<CvResult, CvVars>(GET_CV_BY_ID, {
        variables: { cvId },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
