import { isSuperAdmin } from '@/lib/access';
import { Tenant } from '@/payload-types';
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    access: {
    read: () => true,
    create: ({ req }) => {
    if(isSuperAdmin(req.user)) return true;
    //   const tenant = req.user?.tenants?.[0]?.tenant as Tenant
    //   return Boolean(tenant?.stripeDetailsSubmitted);
      return true
    },
    delete: ({ req }) => isSuperAdmin(req.user),
  },
    admin: {
        useAsTitle: 'name',
        description: 'you must verify your stripe account before adding products'
    },
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
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags',
            hasMany: true,
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
        },
        {
            name: "content",
            type:"textarea",
            admin: {
                description: "Protected content is visiable to coustomer after purchase. Add product documentation, downloable files etc"
            }            
        },
        {
            name : "isPrivate",
            label : "Private",
            type : "checkbox",
            defaultValue : false,
            admin: {
                description: "check this if you want to make this product private"
            }
        },
        {
            name : "isArchived",
            label : "Archived",
            type : "checkbox",
            defaultValue : false,
            admin: {
                description: "check this if you want to hide this product"
            }
        }
    ],
}