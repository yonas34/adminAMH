import { CollectionConfig } from '../../src/collections/config/types';
import { FieldAccess } from '../../src/fields/config/types';
import checkRole from '../access/checkRole';



const access = ({ req: { user } }) => checkRole(['admin'], user);

const Currency_type: CollectionConfig = {
    slug: 'currency_type',
    labels: {
        singular: 'Currency_type',
        plural: 'Currency_types',
    },
  
    admin: {
        useAsTitle: 'currency_name',
    },
    access: {
      read: () => true,
      create: access,
      delete: access,

  },
    fields: [
      {
          name: 'currency_name',
          type: 'text',
          defaultValue: () => {
              return 'Ethiopian Birr';
          },
      },
      {
        name: 'currency_abbreviation',
        type: 'text',
        defaultValue: () => {
            return 'ETB';
        },
    },
      {
          name: 'currency_icon',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
      },
  ],
    timestamps: true,

};

export default Currency_type;
