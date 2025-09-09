import { isSuperAdmin } from '@/lib/access'
import { Tenant } from '@/payload-types'
import type { CollectionConfig } from 'payload'
import { is } from 'zod/v4/locales'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create : ({req})=> isSuperAdmin(req.user),
    delete : ({req})=> isSuperAdmin(req.user),
  },
  
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
          description: "This is the name of your store (e.g. demo's Store)",
      }
    },
    {
     name: 'slug',
     required: true,
     type: 'text',
     label: 'Store Slug',
     index: true,
     unique: true,
     access : {
       update: ({ req }) => isSuperAdmin(req.user),
     },
     admin: {
         description: "This is the slug of your store (e.g. [slug].store.com)",
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
        access: { 
          update: ({ req }) => isSuperAdmin(req.user), 
        },
        admin: {
            readOnly: true,
            description: "you cannot create products until you submit your stripe details"
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
