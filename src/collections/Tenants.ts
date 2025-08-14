import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
    {
      name: 'name',
      required: true,
      type: 'text',
      label: 'Store Name',
      admin: {
          description: "This is the name of your store (e.g. ali's Store)",
      }
    },
    {
     name: 'slug',
     required: true,
     type: 'text',
     label: 'Store Slug',
     index: true,
     unique: true,
     admin: {
         description: "This is the slug of your store (e.g. [slug].payloadcms.com)",
     }   
    },
    {
        name: "image",
        type: 'upload',
        relationTo: 'media',
    },
    {
        name: "stripeAccountId",
        type: 'text',
        required: true,
        admin: {
            readOnly: true
        }
    },
    {
        name : "stripeDetailsSubmitted",
        type: 'checkbox',
        admin: {
            readOnly: true,
            description: "you cannot create products until you submit your stripe details"
        }
    }
  ],
}
