import { gql, useMutation } from "@apollo/client";
import { CreatePositionInput } from "cv-graphql";
import { CreatePositionResult } from "./positions.types";
import { POSITIONS_QUERY } from "./get-positions-query";

export const CREATE_POSITION = gql`
    mutation CreatePosition($position: CreatePositionInput!) {
        createPosition(position: $position) {
            id
            name
        }
    }
`;

export const usePositionCreate = () => {
    return useMutation<CreatePositionResult, { position: CreatePositionInput }>(CREATE_POSITION, {
        refetchQueries: [POSITIONS_QUERY],
    });
};
