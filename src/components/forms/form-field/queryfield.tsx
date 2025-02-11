import { useEffect, useState } from 'react';

import { API_BASE_URL } from '@/config/env';
import { axiosInstance } from '@/utility';
import { Select, SelectProps } from 'antd';
import { find, get, isArray } from 'lodash';
import debounce from 'lodash/debounce';

type keyOptionLabelFunc = (data: any) => string;
export interface QueryfieldProps extends SelectProps {
  endpoint: string,
  keyQueryFilter: string,
  keyOptionValue: string,
  keyOptionLabel: string | keyOptionLabelFunc,
  keyResponseData?: string,
  otherQueryFilter?: { [key: string]: string | number | boolean },
  onOptionSelected: (val: any, opt?: any, rec?: any) => void;
}

const defaultOptions = {
  label: "No Select",
  value: null
}

export const Queryfield = (props: QueryfieldProps) => {
  const {
    endpoint,
    keyResponseData = 'data.data.data',
    keyQueryFilter, keyOptionValue, keyOptionLabel,
    otherQueryFilter,
    ...rest
  } = props;
  const [records, setRecords] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([defaultOptions]);

  useEffect(() => {
    if (get(props, "options.length") || 0 > 0) {
      setOptions(props.options as any[])
    }
  }, props.options)

  async function handleSearch(query: string) {
    await querySearch(query);
  }

  async function querySearch(q: string) {
    const url = `${API_BASE_URL}/${endpoint}`;
    const query = {
      queryops: {
        filter: Object.assign({
          [keyQueryFilter]: q,
        }, otherQueryFilter || {}),
        limit: 20,
        offset: 0,
        page: 1
      }
    };
    try {
      const response = await axiosInstance.post(url, query);
      const data = get(response, keyResponseData, []);
      if (isArray(data)) {
        const opt = transformToOptions(data) || [defaultOptions];
        setRecords(data);
        setOptions([defaultOptions, ...opt]);
      }
    }
    catch (e) {
      console.error(e);
      setOptions([defaultOptions]);
    }
  }

  function transformToOptions(data: any[]) {
    return data.map(datum => {
      let label: string;

      if (typeof keyOptionLabel === "string") {
        label = datum[keyOptionLabel];
      } else {
        label = keyOptionLabel(datum);
      }

      return { label, value: datum[keyOptionValue] }
    });
  }

  function handleSelect(val: any, opt: any) {
    const record = find(records, (v) => v[keyOptionValue] === opt?.value);
    if (opt?.label === defaultOptions.label) {
      opt.label = null
    }

    props?.onOptionSelected && props.onOptionSelected(val, opt, record);
  }

  // Initial Search
  useEffect(() => {
    querySearch('');
  }, []);

  return (
    <Select
      showSearch
      optionFilterProp='label'
      onSearch={debounce(handleSearch, 1000)}
      onSelect={handleSelect}
      options={options}
      {...rest}
    />
  );
};
