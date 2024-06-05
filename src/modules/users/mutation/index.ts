import { useMutation, useQuery } from "@apollo/client";
import { UpdateUserInput } from "cv-graphql";
import { USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from "../api";
import { UsersResult, CreateUserResult, UpdateUserResult } from "../api/users.types";

export const useUsers = () => {
    const query = useQuery<UsersResult>(USERS);
    return { users: query.data?.users ?? [], ...query };
};

export const useUserCreate = () => {
    return useMutation<CreateUserResult>(CREATE_USER, {
        refetchQueries: [USERS],
    });
};

export const useUserUpdate = () => {
    return useMutation<UpdateUserResult, { user: UpdateUserInput }>(UPDATE_USER);
};

export const useUserDelete = (userId: string) => {
    return useMutation(DELETE_USER, {
        variables: {
            userId,
        },
        refetchQueries: [USERS],
    });
};
