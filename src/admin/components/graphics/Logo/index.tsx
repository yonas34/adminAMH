import React from 'react';
import { useConfig } from '../../utilities/Config';
import RenderCustomComponent from '../../utilities/RenderCustomComponent';

const PayloadLogo: React.FC = () => (
  
    < img src= {"http://172.16.15.81:3000/media/img5-1.jpg"} />
);

const Logo: React.FC = () => {
  const {
    admin: {
      components: {
        graphics: {
          Logo: CustomLogo,
        } = {
          Logo: undefined,
        },
      } = {},
    } = {},
  } = useConfig();

  return (
    <RenderCustomComponent
      CustomComponent={CustomLogo}
      DefaultComponent={PayloadLogo}
    />
  );
};

export default Logo;
