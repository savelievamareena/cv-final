import React from "react";

declare module "*.module.css" {
    const classes: Record<string, string>;
    export default classes;
}

declare module "*.module.scss" {
    const classes: Record<string, string>;
    export default classes;
}

declare module "*.module.sass" {
    const classes: Record<string, string>;
    export default classes;
}

declare module "react" {
    function forwardRef<T, P = NonNullable<unknown>>(
        render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
    ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

declare module "*.css";
declare module "*.scss";
declare module "*.sass";
