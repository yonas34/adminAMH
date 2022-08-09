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

const MT: CollectionConfig = {
    slug: 'money_transfer',
    labels: {
        singular:'Money Tranfer',
        plural: 'Money Transfer',
    },
    access: {
        read: () => true,
        create: access,
        delete: access,

    },
    fields: [
       {
            type: 'array',
            name: 'MT_images',
           
            minRows: 6,
            maxRows: 6,
          
            fields: [
               {
                    name: 'MT_image',
                    type: 'upload',
                    label: 'Image',
                    relationTo: 'media',
                },
            ],
        },
      
      
    ],
    timestamps: true,

};

export default MT;
