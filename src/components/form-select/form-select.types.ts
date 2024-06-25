import { SelectProps } from "antd";

export type FormSelectProps = SelectProps & {
    name: string;
    label?: string;
    onChange?: (value: string) => void;
};
