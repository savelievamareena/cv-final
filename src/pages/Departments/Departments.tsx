// import { gql, useLazyQuery } from "@apollo/client";
import type { AuthInput, AuthResult } from "cv-graphql";

// const LOGIN = gql`
//     query Login($auth: AuthInput!) {
//         login(auth: $auth) {
//             user {
//                 id
//                 email
//             }
//             access_token
//         }
//     }
// `;

export interface LoginArgs {
    auth: AuthInput;
}

export interface LoginResult {
    login: AuthResult;
}

const Departments = () => {
    // const { departmens } = useDepartments();

    // const [getUser, { loading, error }] = useLazyQuery(LOGIN, {
    //     variables: {
    //         auth: {
    //             email: "aaklimkov@gmail.com",
    //             password: "qweasd",
    //         },
    //     },
    // });

    return (
        <>
            <button>Click me!</button>
            {/* {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>} */}
        </>
    );
};
export default Departments;
