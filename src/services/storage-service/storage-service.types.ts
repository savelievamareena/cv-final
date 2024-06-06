export interface IStorageService {
    setItem<T>(key: string, item: T): void;
    getItem<T>(key: string): T | null;
    removeItem(key: string): void;
}
