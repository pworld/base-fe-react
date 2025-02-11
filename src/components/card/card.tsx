import React, { ReactNode } from 'react';

import './styles.scss';

interface IBaseCard {
  type?: 'basic' | 'dark';
  children: ReactNode;
  bgColor?: string;
}

export const BaseCard: React.FC<IBaseCard> = (props: IBaseCard) => {
  const { type, children, bgColor } = props;

  return (
    <div style={{ backgroundColor: bgColor }} className={`app-card-wrapper ${type || 'card'}`}>
      {children}
    </div>
  )
}