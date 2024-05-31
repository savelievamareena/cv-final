import { Input } from "antd";

import { ComponentProps } from "react";

interface ColSpanType {
    span?: number;
    offset?: number;
}

interface ResponsiveColType {
    xs?: ColSpanType;
    sm?: ColSpanType;
    md?: ColSpanType;
    lg?: ColSpanType;
    xl?: ColSpanType;
    xxl?: ColSpanType;
}

type WrapperType = ColSpanType | ResponsiveColType;

export interface FormInputProps extends ComponentProps<typeof Input> {
    name: string;
    label?: string;
    required?: boolean;
    labelCol?: WrapperType;
    wrapperCol?: WrapperType;
}
