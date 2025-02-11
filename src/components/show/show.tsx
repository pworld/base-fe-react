import React from 'react';

import { Show, ShowProps } from '@refinedev/antd';

import './styles.scss';

export const BaseShow: React.FC<ShowProps> = (props) => {
  return (
    <Show
      {...props}
      contentProps={{
        className: 'app-show-wrapper'
      }}
    >
      {props?.children}
    </Show>
  )
}