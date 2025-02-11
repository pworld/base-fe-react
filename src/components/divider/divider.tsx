import React from 'react';

import './styles.scss';

interface IDivider {
  title: string;
  type?: 'basic' | 'card';
  className?: string;
}

export const Divider: React.FC<IDivider> = (props: IDivider) => {
  const { title, type, className } = props;

  return (
    <div className={`app-divider ${type || 'card'} ${className}`}>
      <div className='title'>{title}</div>
    </div>
  )
}