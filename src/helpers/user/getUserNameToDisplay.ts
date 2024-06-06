import { User } from "cv-graphql";

export const getUserNameToDisplay = (user: User | null) => {
    if (!user) return;
    if (!user.profile) return user.email;

    let nameToDisplay = "";
    if (user.profile.first_name) {
        nameToDisplay += user.profile.last_name;
        nameToDisplay += " ";
    }

    if (user.profile.last_name) {
        nameToDisplay += user.profile.last_name;
    }

    return nameToDisplay;
};
