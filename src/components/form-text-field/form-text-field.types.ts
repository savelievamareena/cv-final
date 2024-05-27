import { InputProps } from "antd";

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

export interface FormInputProps extends InputProps {
    name: string;
    label?: string;
    required?: boolean;
    labelCol?: WrapperType;
    wrapperCol?: WrapperType;
}
