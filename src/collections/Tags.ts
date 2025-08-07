import type { CollectionConfig } from 'payload'


export const Tags: CollectionConfig = {
    slug: 'tags',
    admin: {
        useAsTitle: 'name'
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: "tags",
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
        }
    ],
}
