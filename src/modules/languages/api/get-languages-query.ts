import { gql, useQuery } from "@apollo/client";
import { LanguagesResult } from "./languages.types";

export const LANGUAGES_QUERY = gql`
    query Languages {
        languages {
            id
            iso2
            name
            native_name
        }
    }
`;
export const useLanguagesQuery = () => {
    const query = useQuery<LanguagesResult>(LANGUAGES_QUERY);
    return { languages: query.data?.languages ?? [], ...query };
};
