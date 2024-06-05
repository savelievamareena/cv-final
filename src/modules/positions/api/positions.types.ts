import { Position } from "cv-graphql";

export interface PositionsResult {
    positions: Position[];
}

export interface CreatePositionResult {
    createPosition: Position;
}

export interface UpdatePositionResult {
    updatePosition: Position;
}
