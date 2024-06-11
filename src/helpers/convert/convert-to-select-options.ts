interface SelectOption {
    label: string;
    value: string;
}

export const convertToSelectOptions = (arr: string[]): SelectOption[] => {
    return arr.map((item) => ({
        label: item,
        value: item,
    }));
};
