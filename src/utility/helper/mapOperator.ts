import { CrudOperators } from '@refinedev/core';

export const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case 'ne':
    case 'gte':
    case 'lte':
      return `_${operator}`;
    case 'contains':
      return '';
    case 'eq':
    default:
      return '';
  }
};
