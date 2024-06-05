import { gql, useQuery } from "@apollo/client";
import { Position } from "cv-graphql";

const POSITIONS = gql`
    query Departments {
        positions {
            id
            name
        }
    }
`;

interface PositionsResult {
    positions: Position[];
}

export const usePositions = () => {
    return useQuery<PositionsResult>(POSITIONS, {
        onError(error) {
            console.error(error.message);
        },
    });
};
