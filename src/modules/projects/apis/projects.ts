import {
    generateGetQuery,
    generateDeleteMutation,
    generateCreateMutation,
    generateUpdateMutation,
} from "@/Api/helpers/queries";

const query = "project";

const fields = [
    "id",
    "created_at",
    "name",
    "internal_name",
    "description",
    "domain",
    "start_date",
    "end_date",
    "team_size",
];

const createArgs = [
    "name",
    "internal_name",
    "description",
    "domain",
    "start_date",
    "end_date",
    "team_size",
];

const updateArgs = [
    "projectId",
    "name",
    "internal_name",
    "description",
    "domain",
    "start_date",
    "end_date",
    "team_size",
];

const getQuery = generateGetQuery(query, fields);
const createMutation = generateCreateMutation(query, fields, createArgs);
const deleteMutation = generateDeleteMutation(query);
const updateMutation = generateUpdateMutation(query, fields, updateArgs);

export { getQuery, createMutation, deleteMutation, updateMutation };
