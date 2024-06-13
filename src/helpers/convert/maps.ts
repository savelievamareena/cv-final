interface SelectOption {
    label: string;
    value: string;
}

export const mapStringsToSelectOptions = (arr: string[]): SelectOption[] => {
    return arr.map((item) => ({
        label: item,
        value: item,
    }));
};
