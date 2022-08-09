import { CollectionConfig } from '../../src/collections/config/types';
import { FieldAccess } from '../../src/fields/config/types';
import checkRole from '../access/checkRole';
import Email from '../blocks/Email';
import Quote from '../blocks/Quote';
import NumberBlock from '../blocks/Number';
import CallToAction from '../blocks/CallToAction';


const access = ({ req: { user } }) => checkRole(['admin'], user);

const HeadingLines: CollectionConfig = {
    slug: 'Heading Lines',
    labels: {
        singular: 'Heading Line',
        plural: 'Heading Lines',
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
            defaultValue: 'Heading Lines',
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
            label:'Heading Lines',
            defaultValue: () => {
                return [{
                    title: 'ok',
                    description:'description'
                }];
            },
            minRows: 5,
          
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    defaultValue: () => {
                        return 'async child';
                    },
                },
                {
                    name: 'description',
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

export default HeadingLines;
