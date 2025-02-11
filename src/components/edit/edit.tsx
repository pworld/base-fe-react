import React from "react";

import { Edit, EditProps, SaveButton } from "@refinedev/antd";
import { useFileTranslate } from "@/utility";
import { useNavigation } from "@refinedev/core";

import Button from "antd/es/button";

import './styles.scss';

export const BaseEdit: React.FC<EditProps> = (props) => {
  const t = useFileTranslate('common');
  const { goBack } = useNavigation();

  return (
    <Edit
      {...props}
      contentProps={{
        className: 'app-edit-wrapper'
      }}
      footerButtons={() => (
        <>
          <Button
            onClick={() => goBack()}
            type="primary"
            danger
          >
            {t('buttons.cancel')}
          </Button>

          <SaveButton
            {...props?.saveButtonProps}
            type="primary"
          >
            {t('buttons.save')}
          </SaveButton>
        </>
      )}
    >
      {props?.children}
    </Edit>
  )
}