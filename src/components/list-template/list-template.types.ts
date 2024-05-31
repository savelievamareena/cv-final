export interface ColumnConfig<T> {
    name: keyof T;
    isSorted: boolean;
}
