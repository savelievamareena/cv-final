import { useReactiveVar } from "@apollo/client";
import { bulkDeleteService } from "./bulk-delete-service";

export const useBulkDeleteItemIds = () => useReactiveVar(bulkDeleteService.itemIds);
