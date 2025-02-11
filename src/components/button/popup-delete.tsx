import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslate } from '@refinedev/core';

interface PopUpDeleteButtonProps {
  onDelete: (recordId: string, record?: any) => void;
  recordId: string;
  record?: string;
  confirmText?: string;
  loading?: boolean;
  hideText?: boolean;
}

export const PopUpDeleteButton: React.FC<PopUpDeleteButtonProps> = ({
  onDelete,
  recordId,
  record,
  confirmText,
  loading = false,
  hideText = false,
}) => {
  const translate = useTranslate();
  const confirmTitle = confirmText || translate("buttons.confirmDelete", "Are you sure you want to delete this item?");

  return (
    <Popconfirm
      title={confirmTitle}
      onConfirm={() => onDelete(recordId, record)}
      okText={translate("buttons.yes", "Yes")}
      cancelText={translate("buttons.cancel", "Cancel")}
      okButtonProps={{ loading }}
    >
      <Button
        danger
        icon={<DeleteOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
        loading={loading}
        data-testid="delete-button"
        size='small'
      >
        {!hideText && translate("buttons.delete", "Delete")}
      </Button>
    </Popconfirm>
  );
};
