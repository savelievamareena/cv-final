const recursiveHelper = (elem: HTMLElement, classList: string[]) => {
    classList.push(...elem.classList);

    if (elem.hasChildNodes()) {
        for (const childNode of elem.children) {
            recursiveHelper(childNode as HTMLElement, classList);
        }
    }
};

export const extractClasses = (elem: HTMLElement) => {
    const res = [...elem.classList];

    if (elem.hasChildNodes()) {
        for (const childNode of elem.children) {
            recursiveHelper(childNode as HTMLElement, res);
        }
    }

    return [...new Set(res)];
};
