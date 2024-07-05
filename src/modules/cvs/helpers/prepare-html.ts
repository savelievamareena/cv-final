import { extractClasses } from "./extract-classes";

const prepareStyles = (
    content: HTMLElement,
    additionalStyleSelectors: string[]
): HTMLStyleElement => {
    const style = document.createElement("style");

    const neededSelectors = [
        ...new Set(
            extractClasses(content)
                .filter((item) => !item.includes("css-dev-only"))
                .concat(additionalStyleSelectors)
        ),
    ];

    Array.from(document.styleSheets).forEach((styleSheet) => {
        if (styleSheet instanceof CSSStyleSheet) {
            const { ownerNode } = styleSheet;

            if (ownerNode instanceof HTMLStyleElement) {
                const newStyle = document.createElement("style");
                newStyle.innerHTML = Array.from(styleSheet.cssRules)
                    .filter((rule) => neededSelectors.some((sel) => rule.cssText.includes(sel)))
                    .map((cssRule) =>
                        cssRule.cssText.replace(/:where\(\.css-dev-only[a-zA-Z0-9-]+\)/g, "")
                    )
                    .join("\n");

                if (newStyle.innerHTML) style.appendChild(newStyle);
            }
        }
    });

    return style;
};

export const prepareHtml = (content: HTMLElement, additionalStyleSelectors: string[]) => {
    const page = document.createElement("div");
    page.append(content.cloneNode(true), prepareStyles(content, additionalStyleSelectors));

    return page.outerHTML;
};
