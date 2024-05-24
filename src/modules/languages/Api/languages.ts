import {
    generateGetQuery,
    generateDeleteMutation,
    generateCreateMutation,
    generateUpdateMutation,
} from "@/Api/helpers/queries";

const query = "language";

const fields = ["id", "created_at", "iso2", "name", "native_name"];
const createArgs = ["iso2", "name", "native_name"];
const updateArgs = ["languageId", "iso2", "name", "native_name"];

const getQuery = generateGetQuery(query, fields);
const createMutation = generateCreateMutation(query, fields, createArgs);
const deleteMutation = generateDeleteMutation(query);
const updateMutation = generateUpdateMutation(query, fields, updateArgs);

export { getQuery, createMutation, deleteMutation, updateMutation };
