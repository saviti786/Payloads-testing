import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { auth } from 'node_modules/payload/dist/auth/operations/auth'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req }) => !!req.user?.roles?.includes('admin'),
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      defaultValue: 'Unknown',
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      defaultValue: 'Unknown',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Facilitator',
          value: 'facilitator',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      access: {
        create: ({ req }) => {
          // req is request object which returns repsonse for eg.: req.user → currently logged-in user
          return Boolean(req.user?.roles?.includes('admin'))
        }, // prevent setting role on signup
        update: ({ req }) => {
          return Boolean(req.user?.roles?.includes('admin'))
        },
      },
    },
  ],
  timestamps: true,
}
