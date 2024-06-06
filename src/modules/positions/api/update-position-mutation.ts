import { gql, useMutation } from "@apollo/client";
import { UpdatePositionInput } from "cv-graphql";
import { UpdatePositionResult } from "./positions.types";
import { GET_POSITIONS_QUERY } from "./get-positions-query";

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
        refetchQueries: [GET_POSITIONS_QUERY],
    });
};
