import { TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';

export function useFileTranslate(ns: string) {
  const { t } = useTranslation();
  return (key: string, opt?: TOptions) => t(`${ns}:${key}`, opt);
}