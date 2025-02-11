import { useFileTranslate } from '@/utility';
import { FC } from 'react';

type PaginationTotalProps = {
  currentTotal: number;
  total: number;
  entityName: string;
};

export const PaginationTotal: FC<PaginationTotalProps> = ({
  total,
  currentTotal,
  entityName,
}) => {
  const t = useFileTranslate("common");

  return (
    <span
      style={{
        marginLeft: '16px',
      }}
    >
      {/* <span className="ant-text secondary">Total {total} Data</span> */}
      <span className="ant-text secondary"> {`${currentTotal} ${t("pagination_total_text")} ${total}`} </span>
    </span>
  );
};
