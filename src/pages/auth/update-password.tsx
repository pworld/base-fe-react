import React from 'react';

import { AuthPage } from '@refinedev/antd';

import { Title } from '@/components/layout/title';

export const UpdatePasswordPage: React.FC = () => {
  return (
    <AuthPage type="updatePassword" title={<Title collapsed={false} />} />
  );
};
