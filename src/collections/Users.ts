import type { CollectionConfig } from 'payload'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'
import { tr } from 'zod/v4/locales'


const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsCollectionSlug: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  arrayFieldAccess :{
    read: () => true,
    create: () => true,
    update: () => true
  },
  tenantFieldAccess :{
    read: () => true,
    create: () => true,
    update: () => true
  }
})
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      admin: {
        position: "sidebar"
      },
      name: "roles",
      type: "select",
      defaultValue: "user",
      hasMany: true,
      options: ["super-admin" , "user"],
      
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField.admin || {}),
        position: "sidebar"
      }
    }
  ],
}
