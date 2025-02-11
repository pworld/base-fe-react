import React from 'react';
import { Card } from 'antd';
import { WidgetCardStyled } from './styled';
import { StyledComponent } from '@emotion/styled';

interface IWidget {
  searchFormProps?: any;
  isWidgetBaseList?: boolean;
  onWidgetFilterClick?: (value: string, key: string) => void;
  widgetData?: IWidgetData[];
  children?: React.ReactNode;
  ComponentStyle?: StyledComponent<any>;
}

export interface IWidgetData {
  label: string;
  value: string | number;
  filterKey: string;
  filterValue: string | number;
}

export const Widget: React.FC<IWidget> = ({ searchFormProps, isWidgetBaseList, onWidgetFilterClick, widgetData, children, ComponentStyle }) => {
  const WidgetCardStyle = ComponentStyle ? ComponentStyle : WidgetCardStyled;
  const onWidgetBaseListFilter = (filterKey: string, filterValue: string | number) => {
    const filterSearchData = [
      {
        field: filterKey,
        operator: 'contains',
        value: filterValue,
      }
    ];
    searchFormProps?.onFinish?.(filterSearchData);
  };

  const onWidgetFilter = () => {
    onWidgetFilterClick && onWidgetFilterClick('value', 'key');
  };


  return (
    <div>
      <WidgetCardStyle>
        {widgetData?.map((widget, key) => (
          <Card key={key} onClick={() => isWidgetBaseList ? onWidgetBaseListFilter(widget.filterKey, widget.filterValue) : onWidgetFilter()}>
            {children ? children : (
              <>
                <p>{widget.label}</p>
                <p>{widget.value}</p>
              </>
            )}
          </Card>
        ))}
      </WidgetCardStyle>
    </div>
  );
};