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

const Coursle: CollectionConfig = {
    slug: 'Coursle',
    labels: {
        singular: 'Coursle',
        plural: 'Coursles',
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
            label: 'Word over photo',
            defaultValue: 'coursel',
            unique: true,
        },
      
        {
            type: 'array',
            name: 'images',
            defaultValue: () => {
                return [{ child: 'ok' }];
            },
            minRows: 5,
          
            fields: [
                {
                    name: 'child',
                    type: 'text',
                    defaultValue: () => {
                        return 'async child';
                    },
                },
                {
                    name: 'image',
                    type: 'upload',
                    label: 'Image',
                    relationTo: 'media',
                },
            ],
        },
      
      
    ],
    timestamps: true,

};

export default Coursle;
