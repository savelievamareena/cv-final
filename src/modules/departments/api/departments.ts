import {
    generateGetQuery,
    generateDeleteMutation,
    generateCreateMutation,
    generateUpdateMutation,
} from "@/api/helpers/queries";

const query = "department";

const fields = ["id", "created_at", "name"];
const createArgs = ["name"];
const updateArgs = ["departmentId", "name"];

const getQuery = generateGetQuery(query, fields);
const createMutation = generateCreateMutation(query, fields, createArgs);
const deleteMutation = generateDeleteMutation(query);
const updateMutation = generateUpdateMutation(query, fields, updateArgs);

export { getQuery, createMutation, deleteMutation, updateMutation };
