import { ComponentProps } from "react";
import TextArea from "antd/es/input/TextArea";

export interface FormTextareaProps extends ComponentProps<typeof TextArea> {
    name: string;
    label?: string;
    required?: boolean;
}
