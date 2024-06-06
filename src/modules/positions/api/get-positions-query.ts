import { gql, useQuery } from "@apollo/client";
import { PositionsResult } from "./positions.types";

export const POSITIONS_QUERY = gql`
    query Positions {
        positions {
            id
            name
        }
    }
`;

export const usePositionsQuery = () => {
    const query = useQuery<PositionsResult>(POSITIONS_QUERY);

    return { positions: query.data?.positions ?? [], ...query };
};
