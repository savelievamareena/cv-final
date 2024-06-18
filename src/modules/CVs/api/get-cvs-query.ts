import { gql, useQuery } from "@apollo/client";
import { CVsResult } from "./CVs.types";

export const GET_CVS_QUERY = gql`
    query Cvs {
        cvs {
            id
            name
            description
            user {
                id
                email
            }
        }
    }
`;

export const useCvsQuery = () => {
    const query = useQuery<CVsResult>(GET_CVS_QUERY);
    return { cvs: query.data?.cvs ?? [], ...query };
};
