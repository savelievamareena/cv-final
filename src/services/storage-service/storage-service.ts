import { IStorageService } from "./storage-service.types";

class StorageService<T> implements IStorageService<T> {
    constructor(private readonly storage: Storage) {}

    setItem(key: string, item: T) {
        this.storage.setItem(key, JSON.stringify(item));
    }

    getItem(key: string): T | null {
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

export const localStorageService = new StorageService<string>(localStorage);
