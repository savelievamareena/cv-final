import { Flex } from "antd";
import { CvProject } from "cv-graphql";

interface DomainBlockProps {
    projects: CvProject[];
}

const DomainBlock = ({ projects }: DomainBlockProps) => {
    const domains: string[] = projects.map((project) => {
        return project.domain;
    });

    return <Flex>{domains.join(", ")}</Flex>;
};

export default DomainBlock;
