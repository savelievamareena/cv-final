import { gql, useQuery } from "@apollo/client";
import { UserResult } from "./users.types";

export const GET_USER_CVS_QUERY = gql`
    query UserCvs($userId: ID!) {
        user(userId: $userId) {
            id
            cvs {
                id
                created_at
                name
                description
            }
        }
    }
`;

export const useUserCvs = (userId: string) => {
    const query = useQuery<UserResult>(GET_USER_CVS_QUERY, { variables: { userId } });
    return { cvs: query.data?.user.cvs ?? [], ...query };
};
