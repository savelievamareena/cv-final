import { gql, useMutation } from "@apollo/client";
import { UpdatePositionInput } from "cv-graphql";
import { POSITIONS_QUERY } from "./get-positions-query";
import { UpdatePositionResult } from "./positions.types";

export const UPDATE_POSITION = gql`
    mutation UpdatePosition($position: UpdatePositionInput!) {
        updatePosition(position: $position) {
            id
            name
        }
    }
`;

export const usePositionUpdate = () => {
    return useMutation<UpdatePositionResult, { position: UpdatePositionInput }>(UPDATE_POSITION, {
        refetchQueries: [POSITIONS_QUERY],
    });
};
