import React from 'react';
import { useConfig } from '../../utilities/Config';
import RenderCustomComponent from '../../utilities/RenderCustomComponent';

const PayloadIcon: React.FC = () => (
    <img src={"htt147p://172.16.15.81:3000/media/footer2.png"}/>
);

const Icon: React.FC = () => {
  const {
    admin: {
      components: {
        graphics: {
          Icon: CustomIcon,
        } = {
          Icon: undefined,
        },
      } = {},
    } = {},
  } = useConfig();

  return (
    <RenderCustomComponent
      CustomComponent={CustomIcon}
      DefaultComponent={PayloadIcon}
    />
  );
};

export default Icon;
