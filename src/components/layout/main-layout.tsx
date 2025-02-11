import { Outlet } from 'react-router-dom';

import {
  ThemedLayoutV2,
} from '@refinedev/antd';
import { Header } from '../header';
import { Title } from './title';
import { OffLayoutArea } from '../offLayoutArea';
import { CanAccess } from '@refinedev/core';

export const MainLayout = () => (
  <ThemedLayoutV2
    Header={Header}
    Title={Title}
    OffLayoutArea={OffLayoutArea}
  >
    <CanAccess>
      <Outlet />
    </CanAccess>
  </ThemedLayoutV2>
);
