import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface inputTemplateProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputTemplate: React.FC<inputTemplateProps> = ({ onChange }) => {
    return <Input placeholder='Search' onChange={onChange} prefix={<SearchOutlined />} />;
};

export default InputTemplate;
