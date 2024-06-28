import { gql, useQuery } from "@apollo/client";
import { CvProject, CvResult } from "./cvs.types";

export const CV_PROJECTS = gql`
  query CvProjects($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      projects {
        ${CvProject}
      }
    }
  }
`;

export const useCvProjects = (cvId: string) => {
    const query = useQuery<CvResult>(CV_PROJECTS, { variables: { cvId } });
    const projects = query.data?.cv.projects ?? [];

    return { projects, ...query };
};
