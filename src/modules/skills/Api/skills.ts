import {
    generateGetQuery,
    generateDeleteMutation,
    generateCreateMutation,
    generateUpdateMutation,
} from "@/Api/helpers/queries";

const query = "skill";

const fields = ["id", "created_at", "name", "category"];
const createArgs = ["name", "category"];
const updateArgs = ["departmentId", "name", "category"];

const getQuery = generateGetQuery(query, fields);
const createMutation = generateCreateMutation(query, fields, createArgs);
const deleteMutation = generateDeleteMutation(query);
const updateMutation = generateUpdateMutation(query, fields, updateArgs);

export { getQuery, createMutation, deleteMutation, updateMutation };
