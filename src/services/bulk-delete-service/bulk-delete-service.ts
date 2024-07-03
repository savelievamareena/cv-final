import { makeVar } from "@apollo/client";
import { IBulkDeleteService } from "./bulk-delete-service.types";

class BulkDeleteService implements IBulkDeleteService {
    itemIds = makeVar<string[]>([]);

    handleItemId(entityId: string) {
        const entityIds = this.itemIds();

        if (entityIds.includes(entityId)) {
            this.itemIds(entityIds.filter((id) => id !== entityId));
            return;
        }

        this.itemIds([...entityIds, entityId]);
    }

    reset() {
        this.itemIds([]);
    }
}

export const bulkDeleteService = new BulkDeleteService();
