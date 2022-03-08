
export const PostSchema = { 
    type: "object",
    properties: {
        date: { type: "string" },
        draft: { type: "boolean" },
        published: { type: "boolean" },
        title: { type: "string" },
        content: { type: "string" }
    },
    required: [ "date", "draft", "published", "title", "content" ],
    additionalProperties: false
}

export const PutOneSchema = {
    type: "object",
    properties: {
        _id: { type: "string" },
        date: { type: "string" },
        draft: { type: "boolean" },
        published: { type: "boolean" },
        title: { type: "string" },
        content: { type: "string" }
    },
    additionalProperties: false
}

export const PutManySchema = {
    "type": "array",
    "items": PutOneSchema
}