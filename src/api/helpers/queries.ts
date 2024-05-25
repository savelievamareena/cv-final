import { gql } from "@apollo/client";

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const generateGetQuery = (queryName: string, fields: string[]) => {
    const capitalizedTypeName = capitalizeFirstLetter(queryName);

    return gql`
        query Get${capitalizedTypeName}s {
            ${queryName}s {
                ${fields.join("\n")}
            }
        }
    `;
};

const generateDeleteMutation = (queryName: string) => {
    const capitalizedStr = capitalizeFirstLetter(queryName);

    return gql`
        mutation Delete${capitalizedStr}Mutation($${queryName}Id: ID!) {
            delete${capitalizedStr}(${queryName}: { ${queryName}Id: $${queryName}Id }) {
                affected
            }
        }
    `;
};

const generateCreateMutation = (queryName: string, fields: string[], args: string[]) => {
    const capitalizedStr = capitalizeFirstLetter(queryName);

    const variables = args.map((arg) => `$${arg}: String!`).join(", ");

    return gql`
        mutation Add${capitalizedStr}(${variables}) {
            create${capitalizedStr}(${queryName}: { ${args.map((arg) => `${arg}: $${arg}`).join(", ")} }) {
                ${fields.join("\n")}
            }
        }
    `;
};

const generateUpdateMutation = (queryName: string, fields: string[], args: string[]) => {
    const capitalizedStr = capitalizeFirstLetter(queryName);
    const variables = args
        .map((arg) => `$${arg}: ${arg === `${queryName}Id` ? "ID!" : "String!"}`)
        .join(",");

    return gql`
        mutation ${capitalizedStr}Mutation(${variables}) {
            update${capitalizedStr}(${queryName}: { ${args.map((arg) => `${arg}: $${arg}`).join(", ")} }) {
                ${fields.join("\n")}
            }
        }
    `;
};

export { generateGetQuery, generateDeleteMutation, generateCreateMutation, generateUpdateMutation };
