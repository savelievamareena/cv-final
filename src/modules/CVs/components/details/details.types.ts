export interface Cv {
    user: {
        email: string;
    };
    name: string;
    education: string;
    description: string;
}

export interface GetUserEmailData {
    cv: Cv;
}

export interface GetUserEmailVars {
    cvId: string;
}
