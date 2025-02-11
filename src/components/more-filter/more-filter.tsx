import React, { ReactNode, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { IconSearchStyled } from './styled';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { useApi } from '@/hooks/useApi';

interface IMoreFilter {
  onFinish?: (value: string) => void;
  template?: ReactNode;
}

export const MoreFilter: React.FC<IMoreFilter> = ({ onFinish }) => {
  // Advanced Search Modal Form
  const [advancedSearchForm] = Form.useForm();
  const [isAdvancedSearchModalVisible, setIsAdvancedSearchModalVisible] = useState(false);

  const handleAdvancedSearch = async (values: any) => {
    onFinish && onFinish(values);
    setIsAdvancedSearchModalVisible(false);
  };

  return (
    <>
      <IconSearchStyled>
        <Button className="search-icon" icon={<MenuOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />} onClick={() => setIsAdvancedSearchModalVisible(true)} />
      </IconSearchStyled>

      <Modal
        title="Advanced Search"
        open={isAdvancedSearchModalVisible}
        onCancel={() => setIsAdvancedSearchModalVisible(false)}
        onOk={() => advancedSearchForm.submit()}
      >
        <Form
          form={advancedSearchForm}
          onFinish={handleAdvancedSearch}
          layout="vertical"
        >
          <Form.Item
            name="firstName"
            label="First Name"
          >
            <Input prefix={<SearchOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />} placeholder="Search by name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
