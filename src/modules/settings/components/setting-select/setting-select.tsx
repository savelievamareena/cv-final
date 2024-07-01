import { Form, Select } from "antd";
import { SettingSelectProps } from "./setting-select.types";

const SettingSelect = ({ label, ...props }: SettingSelectProps) => {
    return (
        <Form.Item label={label} labelCol={{ span: 24 }}>
            <Select {...props} size="large" />
        </Form.Item>
    );
};

export default SettingSelect;
