import { gql, useMutation } from "@apollo/client";
import { DeletePositionInput } from "cv-graphql";
import { POSITIONS_QUERY } from "./get-positions-query";

export const DELETE_POSITION = gql`
    mutation DeletePosition($position: DeletePositionInput!) {
        deletePosition(position: $position) {
            affected
        }
    }
`;

export const usePositionDelete = () => {
    const [deletePosition] = useMutation<null, { position: DeletePositionInput }>(DELETE_POSITION, {
        refetchQueries: [POSITIONS_QUERY],
    });
    return [deletePosition];
};
