import React, { useContext, useEffect, useState } from 'react';

import { PaginationTotal } from '@/components/table/pagination-total';
import { BaseListContext } from '@/context/base-list-context';
import { IBaseList, IMultiFilter } from '@/model/apps/base-list';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { CreateButton, useTable } from '@refinedev/antd';
import { CanAccess, useInvalidate } from '@refinedev/core';
import { useFileTranslate } from '@/utility';
import useBaseModal from '@/hooks/useBaseModal';

import { ActionButton } from '../button/action-button';
import { FormField } from '../forms/form-field/form-field';
import { Widget } from '../widget/widget';

import Button from 'antd/es/button';
import Form from 'antd/es/form';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Space from 'antd/es/space';
import Spin from 'antd/es/spin';
import Table from 'antd/es/table';

import './style.scss';
import './styles.scss';
import './base-list.scss';

const BaseList: React.FC<IBaseList> = ({
  columns,
  resource,
  isWidget,
  moreFilter,
  widgetData,
  scroll,
  isShowPagination = true,
  additionalFilter,
  initialSearchKey,
  searchKeyModeOptions,
  isShowSearchFilter = false,
  defaultFilterBehavior = 'replace',
  paginationMode = 'server',
  paginationSize = 10,
  recordIdField,
  showActionTable = false,
  actionTableProps,
  sort,
  isShowCreateButton = true
}) => {
  const [searchKeyMode, setSearchKeyMode] = useState(initialSearchKey || 'keyword');
  const { setModal, hideModal } = useBaseModal();

  const {
    tableProps,
    searchFormProps,
    tableQueryResult
  } = useTable({
    sorters: sort?.length ? { permanent: sort } : undefined,
    resource: resource,
    pagination: {
      pageSize: paginationSize,
      mode: paginationMode
    },
    filters: {
      defaultBehavior: defaultFilterBehavior,
    },
    onSearch: (crudFilter: IMultiFilter[] | any) => crudFilter
  });

  const t = useFileTranslate('common');
  const baseListContext = useContext(BaseListContext);
  const invalidate = useInvalidate();

  const executeFilter = (filters?: IMultiFilter[]) => {
    if (Array.isArray(filters) && filters?.length > 0) {
      searchFormProps?.onFinish?.(filters);
      return;
    }

    const formValue = searchFormProps.form?.getFieldsValue(true);

    const filter: IMultiFilter[] = [];
    for (const [field, value] of Object.entries(formValue)) {
      // handle true and false more filter case
      if (value === 'true' || value === 'false') {
        filter.push({
          field,
          value: value === 'true' ? true : value === 'false' ? false : null
        });
        continue;
      }
      filter.push({
        field,
        value
      });
    }
    searchFormProps?.onFinish?.(filter);
  };

  const refreshTable = () => {
    invalidate({ resource: resource, invalidates: ['list'] });
  };

  useEffect(() => {
    if (baseListContext) {
      baseListContext.setBaseListContextVal({
        refreshTable: () => refreshTable()
      });
    }
    if (isShowSearchFilter && searchKeyModeOptions) {
      const baseSearchKeyMode = searchKeyModeOptions[0].value;

      if (initialSearchKey) {
        const isInitialSearchKeyExistInSearyKeyModeOptions = searchKeyModeOptions.find(obj => obj.value === initialSearchKey);

        if (isInitialSearchKeyExistInSearyKeyModeOptions) {
          searchFormProps.form?.setFieldValue('search_key_mode', initialSearchKey);
        } else {
          searchFormProps.form?.setFieldValue('search_key_mode', baseSearchKeyMode);
        }
      } else {
        searchFormProps.form?.setFieldValue('search_key_mode', baseSearchKeyMode);
      }
    }
  }, []);

  function showModalAdvanceFilter() {
    setModal({
      open: true,
      title: 'Advance Filter',
      width: 700,
      footer: null,
      content: (
        <>
          <Form
            {...searchFormProps}
            layout='vertical'
            onFinish={() => executeFilter()}
          >
            <br />
            {moreFilter(searchFormProps.form)}
          </Form>
          <Row gutter={[16, 16]} justify='end'>
            <Space>
              <Button
                onClick={() => {
                  searchFormProps.form?.resetFields();
                  executeFilter();
                  setModal(null);
                }}
                type='primary'
                danger
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  executeFilter();
                  setModal(null);
                }}
                type='primary'
              >
                Simpan
              </Button>
            </Space>
          </Row>
        </>
      )
    });
  }

  return (
    <div className='app-base-list'>
      <div className='card'>
        {isWidget && (<Widget widgetData={widgetData || []} isWidgetBaseList={true} searchFormProps={searchFormProps} />)}
        <Row justify='space-between'>
          <Form
            {...searchFormProps}
            onFinish={() => executeFilter()}
          >
            <Space align='start' wrap>
              {moreFilter && (
                <Button
                  className="search-icon"
                  icon={<FilterOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
                  onClick={() => showModalAdvanceFilter()}
                />
              )}

              {isShowSearchFilter && (
                <Form.Item>
                  <Row gutter={[8, 8]}>
                    {searchKeyModeOptions && (
                      <Col span={8}>
                        <FormField
                          id="search-key-mode"
                          name="search_key_mode"
                          component="select"
                          componentProps={{
                            options: searchKeyModeOptions,
                            onSelect: (val) => {
                              setSearchKeyMode(val);

                              // delete form field exclude val
                              const searchKeyModeOptionValueExceptVal = searchKeyModeOptions.filter((searchKeyModeOption) => searchKeyModeOption.value != val).map(searcKeyModeOption => searcKeyModeOption.value);
                              for (const field of searchKeyModeOptionValueExceptVal) {
                                searchFormProps.form?.setFieldValue(field, null);
                              }
                            }
                          }}
                        />
                      </Col>
                    )}
                    <Col span={searchKeyModeOptions ? 16 : 24}>
                      <FormField
                        id="search-key-mode-b"
                        name={searchKeyMode}
                        component='text'
                        componentProps={{
                          size: 'middle',
                          prefix: <SearchOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
                          suffix: <Spin size="small" spinning={tableQueryResult.isFetching} />,
                          placeholder: 'Search',
                          onPressEnter: () => {
                            executeFilter();
                          },
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              )}

              {additionalFilter && (
                <>
                  {additionalFilter(searchFormProps.form)}
                </>
              )}
              <Button
                icon={<SearchOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
                onClick={() => executeFilter()}
              >
                {t('base_list.search_button')}
              </Button>
            </Space>
          </Form>
          {isShowCreateButton && (
            <CanAccess resource={resource} action="create">
              <CreateButton size="middle">
                {t('base_list.create_button')}
              </CreateButton>
            </CanAccess>
          )}
        </Row>

        {tableQueryResult.data?.data && !(tableQueryResult as any).data?.data?.error ? (
          <Table
            className='table'
            {...tableProps}
            pagination={isShowPagination ? {
              ...tableProps.pagination,
              showTotal: (total) => (
                <PaginationTotal total={total} currentTotal={tableQueryResult.data?.data?.length} entityName="Data" />
              ),
              total: tableQueryResult.data?.total || 0,
              pageSizeOptions: [10, 20, 50, 100],
              showSizeChanger: true
            } : false}
            rowKey="id"
            scroll={scroll}
          >
            {columns.map((column, key) => (
              <Table.Column
                align={column?.align || 'left'}
                key={key}
                dataIndex={column.dataIndex}
                title={column.title}
                render={(_, record, index) => column.render ? column.render(_, record, index) : _ || '-'}
              />
            ))}
            {showActionTable && (
              <>
                <Table.Column
                  title={t('table.actions')}
                  render={(_, record: any) => (
                    <Space>
                      <ActionButton
                        {...actionTableProps}
                        recordId={record[recordIdField || 'id']}
                        record={record}
                        resource={resource}
                        baseListContext={baseListContext}
                      />
                    </Space>
                  )}
                />
              </>
            )}
          </Table>
        ) : (
          <div className='no-data'>No Data</div>
        )}
      </div>
    </div >
  );
};

export default BaseList;