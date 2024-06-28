import { Cv } from "cv-graphql";

export interface CVsResult {
    cvs: Cv[];
}
export interface CvResult {
    cv: Cv;
}
export interface RemoveCvProjectResult {
    removeCvProject: Cv;
}
export interface CreateCvResult {
    createCv: Cv;
}

export interface UpdateCvResult {
    updateCv: Cv;
}
export interface AddCvProjectResult {
    addCvProject: Cv;
}
export const CvProject = `
  id
  project {
    id
  }
  name
  internal_name
  domain
  description
  start_date
  end_date
  team_size
  roles
  responsibilities
`;
