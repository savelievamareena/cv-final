const prepareStyles = (): HTMLStyleElement => {
    const style = document.createElement("style");

    Array.from(document.styleSheets).forEach((styleSheet) => {
        if (styleSheet instanceof CSSStyleSheet) {
            const { ownerNode } = styleSheet;

            if (ownerNode instanceof HTMLStyleElement) {
                const newStyle = document.createElement("style");
                newStyle.innerHTML = Array.from(styleSheet.cssRules)
                    .map((cssRule) => cssRule.cssText)
                    .join("\n");
                style.appendChild(newStyle);
            }
        }
    });

    return style;
};

export const prepareHtml = (content: HTMLElement) => {
    const page = document.createElement("div");
    page.append(content.cloneNode(true), prepareStyles());

    return page.outerHTML;
};
