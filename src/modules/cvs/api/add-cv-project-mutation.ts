import { gql, useMutation } from "@apollo/client";
import { AddCvProjectInput } from "cv-graphql";
import { AddCvProjectResult, CvProject } from "./cvs.types";

export const ADD_CV_PROJECT = gql`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      id
      projects {
        ${CvProject}
      }
    }
  }
`;

export const useCvProjectAdd = () => {
    return useMutation<AddCvProjectResult, { project: AddCvProjectInput }>(ADD_CV_PROJECT);
};
