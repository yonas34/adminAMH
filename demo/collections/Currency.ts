import { CollectionConfig } from '../../src/collections/config/types';
import checkRole from '../access/checkRole';


const access = ({ req: { user } }) => checkRole(['admin'], user);

const Currency: CollectionConfig = {
    slug: 'Currency',
    labels: {
        singular: 'Currency',
        plural: 'Currency',
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
            label: 'Currency Exchange',
            defaultValue: 'Currency',
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
       {name:"data",
       type:"array",
   
       fields:
        [{
            name: 'currency_type',
            label: 'Currency Type',
            type: 'relationship',
            relationTo: 'currency_type',
            
            hasMany: false,
         
          },
        {
            type: 'array',
            name: 'currency',
            label:'Currency Exchange',
           
                 
            fields:[
                       
                {
                  name:"date",
                  label:"Date",
                  type:"date",
                  admin:{
    placeholder:new Date().toLocaleString() + "",

                  }
                },
              {
                  name: 'CashBuying',
                  label:"Cash Buying",
                  type: 'number',
                  defaultValue: () => {
                      return '1';
                  },
              },
              {
                name: 'CashSelling',
                label:"Cash Selling",
                type: 'number',
                defaultValue: () => {
                    return '1';
                },
            }

          ],
        },]
      }
      
    ],
    timestamps: true,

};

export default Currency;
