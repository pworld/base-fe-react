import React from 'react';
import { useState, useEffect } from 'react';
import {
  useGetLocale,
  useSetLocale,
  useGetIdentity,
  useTranslate,
  useList,
} from '@refinedev/core';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';

import {
  Dropdown,
  Input,
  Avatar,
  Typography,
  Space,
  Grid,
  Row,
  Col,
  AutoComplete,
  Layout as AntdLayout,
  Button,
  theme,
  MenuProps,
} from 'antd';

import { useLogout } from '@refinedev/core';

import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';

import { useConfigProvider } from '@/context';
import { IconMoon, IconSun } from '../../components/icons';
import { IIdentity } from '@/model/apps/user';
import { HeaderTitle } from './styled';

const { Header: AntdHeader } = AntdLayout;
const { useToken } = theme;
const { Text } = Typography;
const { useBreakpoint } = Grid;

interface IOptionGroup {
  value: string;
  label: string | React.ReactNode;
}

interface IOptions {
  label: string | React.ReactNode;
  options: IOptionGroup[];
}

interface IDropdownProfileOpt {
  label: string;
  key: string;
}

export const Header: React.FC = () => {
  const { token } = useToken();
  const { mode, setMode } = useConfigProvider();
  const { i18n, t } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity<IIdentity>();
  const screens = useBreakpoint();
  const { mutate: logout } = useLogout();

  const currentLocale = locale();

  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<IOptions[]>([]);

  useEffect(() => {
    setOptions([]);
  }, [value]);

  const profileDropdownItemsData: IDropdownProfileOpt[] = [
    {
      label: t('pages.profile.label'),
      key: 'profile'
    },
    {
      label: t('pages.logout.label'),
      key: 'logout'
    }
  ];

  const menuItems: MenuProps['items'] = [...(i18n.languages || [])]
    .sort()
    .map((lang: string) => ({
      key: lang,
      onClick: () => changeLanguage(lang),
      icon: (
        <span style={{ marginRight: 8 }}>
          <Avatar size={16} src={`/images/flags/${lang}.svg`} />
        </span>
      ),
      label: lang === 'id' ? 'Indonesia' : 'English',
    }));


  const profileDropdownItems: MenuProps['items'] = [...(profileDropdownItemsData || [])]
    .map((item: IDropdownProfileOpt) => ({
      key: item.key,
      onClick: () => handleProfileDDclick(item.key),
      label: t(item.label),
    }));

  const handleProfileDDclick = (key: string) => {
    if (key?.toLowerCase() === 'profile') {
      console.log('going to profile', key);
    } else {
      logout();
    }
  };

  return (
    <AntdHeader
      style={{
        backgroundColor: token.colorBgElevated,
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 1,
      }}
    >
      <Row
        align="middle"
        style={{
          justifyContent: screens.sm ? 'space-between' : 'end',
        }}
      >
        <Col xs={0} sm={12}>
          <AutoComplete
            style={{
              width: '100%',
              maxWidth: '550px',
            }}
            options={options}
            filterOption={false}
            onSearch={debounce(
              (value: string) => setValue(value),
              300,
            )}
          >
            <Input
              size="large"
              placeholder={t('search.placeholder')}
              suffix={<SearchOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
            />
          </AutoComplete>
        </Col>
        <Col>
          <Space size="middle" align="center">
            <Button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              type="default"
              icon={mode === 'light' ? <IconMoon /> : <IconSun />}
              onClick={() => {
                setMode(mode === 'light' ? 'dark' : 'light');
              }}
            />
            <Dropdown
              menu={{
                items: menuItems,
                selectedKeys: currentLocale ? [currentLocale] : [],
              }}
            >
              <a onClick={(e) => e.preventDefault()} style={{ color: 'inherit' }}>
                <Space>
                  <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
                  <div style={{ display: screens.lg ? 'block' : 'none' }}>
                    {currentLocale === 'id' ? 'Indonesia' : 'English'}
                    <DownOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} style={{ fontSize: '12px', marginLeft: '6px' }} />
                  </div>
                </Space>
              </a>
            </Dropdown>
            <Dropdown
              menu={{
                items: profileDropdownItems,
                selectedKeys: currentLocale ? [currentLocale] : [],
              }}
            >
              <a onClick={(e) => e.preventDefault()} style={{ color: 'inherit' }}>
                <Space>
                  <div style={{ display: 'flex' }}>
                    <Text ellipsis strong style={{ alignSelf: 'center', paddingRight: '12px' }}>{user?.name}</Text>
                    <Avatar
                      size="large"
                      src={user?.avatar}
                      alt={user?.name}
                    />
                  </div>
                </Space>
              </a>
            </Dropdown>
          </Space>
        </Col>
      </Row>
    </AntdHeader>
  );
};
