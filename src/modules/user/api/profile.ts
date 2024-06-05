import { gql, useMutation, useQuery } from "@apollo/client";
import { Profile, User } from "cv-graphql";

const PROFILE = gql`
    query Profile($userId: ID!) {
        profile(userId: $userId) {
            id
            created_at
            first_name
            last_name
            full_name
            avatar
        }
    }
`;

const USER = gql`
    query User($userId: ID!) {
        user(userId: $userId) {
            id
            email
            is_verified
            position {
                id
                name
            }
            department {
                id
                name
            }
        }
    }
`;

interface QueryArgs {
    userId: string;
}

interface UserResult {
    user: User;
}
interface ProfileResult {
    profile: Profile;
}

export interface UpdateProfileInput {
    profile: {
        userId: string;
        first_name: string;
        last_name: string;
    };
}

export interface UpdateUserInput {
    user: {
        userId: string;
        departmentId: string;
        positionId: string;
    };
}

export const useProfile = ({ userId }: QueryArgs) => {
    return useQuery<ProfileResult, QueryArgs>(PROFILE, {
        variables: {
            userId,
        },
        onError(error) {
            console.error(error.message);
        },
        onCompleted(data) {
            console.log(data);
        },
    });
};

export const useUser = ({ userId }: QueryArgs) => {
    return useQuery<UserResult, QueryArgs>(USER, {
        variables: {
            userId,
        },
        onError(error) {
            console.error(error.message);
        },
        onCompleted(data) {
            console.log(data);
        },
    });
};

export const UPDATE_PROFILE = gql`
    mutation UpdateProfile($profile: UpdateProfileInput!) {
        updateProfile(profile: $profile) {
            id
        }
    }
`;

export const useUpdateProfile = () => {
    return useMutation<User, UpdateProfileInput>(UPDATE_PROFILE, {
        refetchQueries: [PROFILE],
    });
};

export const UPDATE_USER = gql`
    mutation UpdateUser($user: UpdateUserInput!) {
        updateUser(user: $user) {
            id
        }
    }
`;

export const useUpdateUser = () => {
    return useMutation<User, UpdateUserInput>(UPDATE_USER, {
        refetchQueries: [PROFILE],
    });
};
