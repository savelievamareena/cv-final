import { gql, useQuery } from "@apollo/client";
import { useNotificationContext } from "@/helpers/notification";

export const GET_CV_BY_ID = gql`
    query GetUserEmail($cvId: ID!) {
        cv(cvId: $cvId) {
            user {
                email
            }
            name
            education
            description
        }
    }
`;

interface CvResult {
    cv: {
        user: {
            email: string;
        };
        name: string;
        education: string;
        description: string;
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
