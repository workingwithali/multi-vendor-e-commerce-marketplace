import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'text',
        },
        {
            name: 'price',
            type: 'number',
            required: true,
            admin: {
                description: 'The price in PKR'
            }
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: false,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'refund policy',
            type: 'select',
            options: ["30-days","14-days","7-days","3-days","1-day","no-refund"],
            defaultValue: "30-days"
        }
    ],
}