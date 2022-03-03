
export const PostSchema = { 
    type: "object",
    properties: {
        _id: { type: "string" },
        date: { type: "string" },
        draft: { type: "boolean" },
        published: { type: "boolean" },
        title: { type: "string" },
        content: { type: "string" }
    },
    required: [ "_id", "date", "draft", "published", "title", "content" ],
    additionalProperties: false
}

export const PutSchema = {
    type: "object",
    properties: {
        _id: { type: "string" },
        date: { type: "string" },
        draft: { type: "boolean" },
        published: { type: "boolean" },
        title: { type: "string" },
        content: { type: "string" }
    },
    required: [ "_id" ],
    additionalProperties: false
}