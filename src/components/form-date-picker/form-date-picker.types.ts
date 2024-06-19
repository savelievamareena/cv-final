import { DatePickerProps } from "antd";

export type FormDatePickerProps = DatePickerProps & {
    name: string;
    label?: string;
};
