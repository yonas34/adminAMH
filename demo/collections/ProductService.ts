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

const productService: CollectionConfig = {
    slug: 'Product And Services',
    labels: {
        singular: 'Product And Service',
        plural: 'Product And Services',
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
            defaultValue: 'Product & Services',
            unique: true,
            admin: {
                readOnly: true,
                hidden:true,},
            access: {
                create: ({ req: { user } }) => Boolean(user),
                update: ({ req: { user } }) => Boolean(user),
                read: ({ req: { user } }) => Boolean(user),
            },
        },
      
        {
            type: 'array',
            name: 'data',
            label:'product/services',
            defaultValue: () => {
                return [{
                    title: 'Product Title',
                    description:'description'
                }];
            },
            minRows: 4,
            maxRows:4,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    defaultValue: () => {
                        return 'Product title';
                    },
                },
                {
                    name: 'description',
                    type: 'text',
                    defaultValue: () => {
                        return 'description';
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

export default productService;
