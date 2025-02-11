import React from "react";

import { Create, CreateProps, SaveButton } from "@refinedev/antd";
import { useFileTranslate } from "@/utility";
import { useNavigation } from "@refinedev/core";

import Button from "antd/es/button";

import './styles.scss';

export const BaseCreate: React.FC<CreateProps> = (props) => {
  const t = useFileTranslate('common');
  const { goBack } = useNavigation();

  return (
    <Create
      {...props}
      contentProps={{
        className: 'app-create-wrapper'
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
    </Create>
  )
}