import { IStorageService } from "./storage-service.types";

class StorageService implements IStorageService {
    constructor(private readonly storage: Storage) {}

    setItem<T>(key: string, item: T) {
        this.storage.setItem(key, JSON.stringify(item));
    }

    getItem<T>(key: string): T | null {
        const item = this.storage.getItem(key);
        if (item) {
            return JSON.parse(item) as T;
        }
        return null;
    }

    removeItem(key: string) {
        this.storage.removeItem(key);
    }
}

export const localStorageService = new StorageService(localStorage);
