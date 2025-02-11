import { Dropdown, MenuProps, Popconfirm, Popover, Space } from "antd";
import { DashboardIcon, DeleteIcon, Editicon, EyeIcon } from "../ant-icons";
import { useDelete, useNavigation, useTranslate } from "@refinedev/core";
import { DeleteParams } from "@refinedev/core/dist/hooks/data/useDelete";
import { PopUpDeleteButton } from "./popup-delete";
import { ReactNode } from "react";
import { useFileTranslate } from "@/utility";

interface ActionButtonProps {
  recordId: string;
  record: any;
  resource: string;
  baseListContext: any;

  /**
   * Custom Edit URL
   */
  editUrl?: string;

  /**
   * Custom Show URL
   */
  showUrl?: string;

  /**
   * Custom Delete URL
   */
  deleteUrl?: string;

  /**
   * Custom Items, will replace default button
   */
  customDropDownItems?: MenuProps["items"]
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  recordId,
  record,
  resource,
  baseListContext,
  editUrl = null,
  showUrl = null,
  deleteUrl = null,
  customDropDownItems
}) => {
  const t = useFileTranslate('common');

  const { push } = useNavigation();
  const { mutate: doDelete } = useDelete();

  const handleDelete = (id: string, record: any) => {
    doDelete(
      {
        resource: deleteUrl ? deleteUrl : `${resource}/:id/delete`,
        id,
        values: {
          row_version: record.row_version
        }
      },
      {
        onSuccess: () => {
          baseListContext.baseListContextVal.refreshTable()
        }
      }
    )
  }

  const moreButtonProps: MenuProps["items"] = [
    {
      key: 1,
      label: t('action_table.show'),
      icon: EyeIcon,
      onClick: () => {
        push(showUrl ? showUrl : `/${resource}/show/${recordId}`)
      }
    },
    {
      key: 2,
      label: (
        <Popconfirm
          title={t('action_table.message.delete')}
          onConfirm={() => handleDelete(recordId, record)}
          okText="Yes"
          cancelText="Cancel"
          placement="topLeft"
        >
          {t('action_table.delete')}
        </Popconfirm>
      ),
      icon: DeleteIcon,

    }
  ];

  return (
    <Dropdown.Button
      menu={{ items: customDropDownItems && customDropDownItems?.length > 0 ? customDropDownItems : moreButtonProps }}
      trigger={["click"]}
      onClick={() => {
        push(editUrl ? editUrl : `/${resource}/edit/${recordId}`)
      }}
      type="primary"
    >
      <Space align="baseline">
        {Editicon}
        {t('action_table.edit')}
      </Space>
    </Dropdown.Button>
  )
}