import { useMutation, useQuery } from "@apollo/client";
import { CreatePositionInput, UpdatePositionInput, DeletePositionInput } from "cv-graphql";
import {
    CreatePositionResult,
    PositionsResult,
    UpdatePositionResult,
} from "../api/positions.types";
import { POSITIONS, CREATE_POSITION, UPDATE_POSITION, DELETE_POSITION } from "../api";

export const usePositions = () => {
    const query = useQuery<PositionsResult>(POSITIONS);

    return { positions: query.data?.positions ?? [], ...query };
};

export const usePositionCreate = () => {
    return useMutation<CreatePositionResult, { position: CreatePositionInput }>(CREATE_POSITION, {
        refetchQueries: [POSITIONS],
    });
};

export const usePositionUpdate = () => {
    return useMutation<UpdatePositionResult, { position: UpdatePositionInput }>(UPDATE_POSITION);
};

export const usePositionDelete = (positionId: string) => {
    const [deletePosition] = useMutation<null, { position: DeletePositionInput }>(DELETE_POSITION, {
        variables: {
            position: { positionId },
        },
        refetchQueries: [POSITIONS],
    });
    return [deletePosition];
};
