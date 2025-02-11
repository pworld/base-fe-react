import { Col, Row } from 'antd';
import { FormField, FormFieldProps, InputFieldTypes } from './form-field/form-field';
import React from 'react';

type ColumnPropsType = React.ComponentProps<typeof Col>;
type SpanType = { span: number };
type FieldType = FormFieldProps<InputFieldTypes> & { colProps?: ColumnPropsType };

export interface FieldGenProps {
  direction: 'stacked' | 'grid'
  fields: (FieldType | SpanType)[],
  rowProps?: React.ComponentProps<typeof Row>,
}

function isEmptyFieldType(field: FieldType | SpanType): field is SpanType {
  return 'span' in field;
}

export const FormFieldGen = (props: FieldGenProps) => {
  const {
    direction = 'stacked',
    fields,
    rowProps,
  } = props;

  function renderGrid() {
    return fields.map((line, idx) => {
      if (isEmptyFieldType(line)) {
        return (
          <Col key={idx} span={line.span} />
        );
      }
      else return (
        <Col {...line.colProps} key={`form-col-${line.key ?? line.name}`}>
          <FormField {...line} />
        </Col>
      );
    });
  }

  function renderStack() {
    return fields.map((line) => {
      if (isEmptyFieldType(line)) {
        return null;
      }
      else return (
        <FormField {...line} />
      );
    });
  }

  if (direction === 'grid') {
    return (
      <Row {...rowProps}>
        {renderGrid()}
      </Row>
    );
  }
  else return (
    <>
      {renderStack()}
    </>
  );
};