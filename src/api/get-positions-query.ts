import { gql, useQuery } from "@apollo/client";
import { Position } from "cv-graphql";
import { useNotificationContext } from "@/helpers/notification";

const GET_POSITIONS_QUERY = gql`
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

    return useQuery<PositionsResult>(GET_POSITIONS_QUERY, {
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
