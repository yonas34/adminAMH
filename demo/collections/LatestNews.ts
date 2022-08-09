import { CollectionConfig } from '../../src/collections/config/types';
import { FieldAccess } from '../../src/fields/config/types';
import checkRole from '../access/checkRole';
import Email from '../blocks/Email';
import Quote from '../blocks/Quote';
import NumberBlock from '../blocks/Number';
import CallToAction from '../blocks/CallToAction';


const access = ({ req: { user } }) => checkRole(['admin'], user);

const LatestNews: CollectionConfig = {
    slug: 'latestNews',
    labels: {
        singular: 'Latest News',
        plural: 'Latest News',
    },
  
    admin: {
        useAsTitle: 'data',
    },
    access: {
        read: () => true,
        create: access,
        delete: access,

    },
   
    fields: [
    
      
        {
            type: 'array',
            name: 'data',
            label:'Latest News',
            defaultValue: () => {
                return [{
                    title: 'ok',
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
                        return 'async child';
                    },
                },
                {
                    name:"date",
                    label:"Date",
                    type:"date",
                    admin:{
      placeholder:new Date().toLocaleString() + "",
  
                    }
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

export default LatestNews;
