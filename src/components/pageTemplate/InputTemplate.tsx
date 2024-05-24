import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface inputTemplateProps {
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputTemplate: React.FC<inputTemplateProps> = ({ placeholder, onChange }) => {
    return <Input placeholder={placeholder} onChange={onChange} prefix={<SearchOutlined />} />;
};

export default InputTemplate;
