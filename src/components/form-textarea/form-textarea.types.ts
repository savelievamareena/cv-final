import TextArea from "antd/es/input/TextArea";
import { ComponentProps } from "react";

export interface FormTextareaProps extends ComponentProps<typeof TextArea> {
    name: string;
    label?: string;
    required?: boolean;
}
