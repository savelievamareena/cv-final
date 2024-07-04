import { ReactiveVar } from "@apollo/client";

export interface IBulkDeleteService {
    itemIds: ReactiveVar<string[]>;
    handleItemId(entityId: string): void;
    reset(): void;
}
