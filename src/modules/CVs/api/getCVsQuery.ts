import { gql, useQuery } from "@apollo/client";
import { CVsResult } from "./CVs.types";

export const CVS_QUERY = gql`
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

export const useCvs = () => {
    const query = useQuery<CVsResult>(CVS_QUERY);
    return { cvs: query.data?.cvs ?? [], ...query };
};
