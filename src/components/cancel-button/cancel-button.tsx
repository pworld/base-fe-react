import React from "react";

import Button from "antd/es/button";

import { useNavigation } from "@refinedev/core";
import { useFileTranslate } from "@/utility";

export const CancelButton: React.FC<{ path: string }> = ({ path }) => {
  const t = useFileTranslate('common');
  const { push } = useNavigation();

  return (
    <>
      <Button
        onClick={() => push(path)}
        type="primary"
        danger
      >
        {t('buttons.cancel')}
      </Button>
    </>
  )
}