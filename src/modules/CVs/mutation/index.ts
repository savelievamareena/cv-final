import { CreateCvInput, DeleteCvInput, UpdateCvInput } from "cv-graphql";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CV, CVS, DELETE_CV, UPDATE_CV } from "../api";
import { CreateCvResult, CVsResult, UpdateCvResult } from "../api/CVs.types";
import { USER_CVS } from "@/modules/users/api";

export const useCvs = () => {
    const query = useQuery<CVsResult>(CVS);
    return { cvs: query.data?.cvs ?? [], ...query };
};

export const useCvCreate = () => {
    return useMutation<CreateCvResult, { cv: CreateCvInput }>(CREATE_CV, {
        refetchQueries: [CVS, USER_CVS],
    });
};

export const useCvUpdate = () => {
    return useMutation<UpdateCvResult, { cv: UpdateCvInput }>(UPDATE_CV);
};

export const useCvDelete = (cvId: string) => {
    return useMutation<null, { cv: DeleteCvInput }>(DELETE_CV, {
        variables: {
            cv: {
                cvId,
            },
        },
        refetchQueries: [CVS],
    });
};
