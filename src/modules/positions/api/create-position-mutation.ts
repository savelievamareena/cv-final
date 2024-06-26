import { gql, useMutation } from "@apollo/client";
import { CreatePositionInput } from "cv-graphql";
import { CreatePositionResult } from "./positions.types";
import { GET_POSITIONS_QUERY } from "@/api";

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
