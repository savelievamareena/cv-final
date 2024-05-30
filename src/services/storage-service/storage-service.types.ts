export interface IStorageService<T> {
    setItem(key: string, item: T): void;
    getItem(key: string): T | null;
    removeItem(key: string): void;
}
