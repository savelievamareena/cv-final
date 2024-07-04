import { gql, useMutation } from "@apollo/client";
import { CreatePositionInput } from "cv-graphql";
import { GET_POSITIONS_QUERY } from "@/api";
import { CreatePositionResult } from "./positions.types";

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
        refetchQueries: [GET_POSITIONS_QUERY],
    });
};
