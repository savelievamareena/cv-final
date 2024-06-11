import { gql, useQuery } from "@apollo/client";
import { Position } from "cv-graphql";
import { useNotificationContext } from "@/helpers/notification";

export const GET_POSITIONS_QUERY = gql`
    query Positions {
        positions {
            id
            name
        }
    }
`;

interface PositionsResult {
    positions: Position[];
}

export const usePositionsQuery = () => {
    const { showNotification } = useNotificationContext();

    const { data, ...query } = useQuery<PositionsResult>(GET_POSITIONS_QUERY, {
        onError: (error) => {
            showNotification("error", error.message);
        },
    });

    return { positions: data?.positions ?? [], ...query };
};
