import { Button } from "antd";
interface ButtonTemplateProps {
    tittle: string;
    onClick: () => void;
}

const ButtonTemplate: React.FC<ButtonTemplateProps> = ({ tittle }) => {
    return (
        <Button type='primary' danger ghost>
            {tittle}
        </Button>
    );
};

export default ButtonTemplate;
