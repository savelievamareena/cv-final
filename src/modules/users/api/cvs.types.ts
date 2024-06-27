import { Cv } from "cv-graphql";

export interface CVsResult {
    cvs: Cv[];
}

export interface CreateCvResult {
    createCv: Cv;
}

export interface UpdateCvResult {
    updateCv: Cv;
}
