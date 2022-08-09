import { CollectionConfig } from '../../src/collections/config/types';
import { FieldAccess } from '../../src/fields/config/types';
import checkRole from '../access/checkRole';
import Email from '../blocks/Email';
import Quote from '../blocks/Quote';
import NumberBlock from '../blocks/Number';
import CallToAction from '../blocks/CallToAction';

const PublicReadabilityAccess: FieldAccess = ({ req: { user }, siblingData }) => {
    if (checkRole(['admin'], user)) {
        return true;
    }

    if (siblingData ?.allowPublicReadability) return true;

    return false;
};
const access = ({ req: { user } }) => checkRole(['admin'], user);

const Counter: CollectionConfig = {
    slug: 'Counter',
    labels: {
        singular: 'Counter',
        plural: 'Counter',
    },
  
    admin: {
        useAsTitle: 'text',
    },
    access: {
        read: () => true,
        create: access,
        delete: access,

    },
    fields: [
     
        {
            name: 'text',
            type: 'text',
            label: 'title',
          
            defaultValue: 'counter',
            unique: true,
            admin: { readOnly: true, },
            access: {
                create: ({ req: { user } }) => access,
                update: ({ req: { user } }) => access,
                read: ({ req: { user } }) => access,
            },
        },
        {
            type: 'array',
            name: 'counts',
            minRows: 5,
            maxRows:5,
          
            fields: [
                {
                    name: 'child',
                    type: 'text',
                    defaultValue: () => {
                        return 'Share holders';
                    },
                },
                {
                    name: 'value',
                    type: 'number',
                    label: 'amount',
                },
            ],
        },
      
      
    ],
    timestamps: true,

};

export default Counter;
