import type { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts', // this becomes the URL /api/contacts
  admin: {
    useAsTitle: 'name', // shows 'name' as the label in admin panel
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      validate: (value: unknown) => {
        // Allow empty since field is not required
        if (!value) return true

        // Make sure it's actually a string
        if (typeof value !== 'string') {
          return 'Invalid phone number'
        }

        return /^\d{10}$/.test(value) ? true : 'Please enter 10 digit numbers only'
      },
    },
  ],
}
