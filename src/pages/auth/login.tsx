import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AuthPage, useForm } from '@refinedev/antd';
import { useLogin } from '@refinedev/core';

import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';

import { FormField } from '@/components/forms/form-field/form-field';
import { LoginParams } from '@/model/apps/auth';

import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Form from 'antd/es/form';
import Spin from 'antd/es/spin';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { mutate, isLoading } = useLogin();
  const { form } = useForm();

  const emailFromSearchParams = searchParams.get('email');
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  const initialValues = emailFromSearchParams
    ? { email: emailFromSearchParams }
    : {};

  useEffect(() => {
    if (accessToken && refreshToken) {
      mutate({
        accessToken,
        refreshToken,
      });
    }
  }, [accessToken, refreshToken]);

  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues,
      }}
      contentProps={{
        className: 'auth-page',
      }}
      providers={[
        {
          name: 'google',
          label: 'Sign in with Google',
          icon: (
            <GoogleOutlined
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              style={{
                fontSize: 24,
                lineHeight: 0,
              }}
            />
          ),
        },
        {
          name: 'github',
          label: 'Sign in with GitHub',
          icon: (
            <GithubOutlined
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              style={{
                fontSize: 24,
                lineHeight: 0,
              }}
            />
          ),
        },
      ]}
      renderContent={() => {
        return (
          <Spin spinning={isLoading}>
            <div className='login-section'>
              <Card className='login-card'>
                <div className='sign-in-text'>Login</div>
                <Form<LoginParams>
                  layout="vertical"
                  form={form}
                  onFinish={(values) => {
                    mutate(values);
                  }}
                  requiredMark={false}
                  initialValues={{
                    remember: false,
                  }}
                >
                  <div className='form-section'>
                    <label>Email</label>
                    <FormField id='email' name="email" rules={[{ required: true }]} component='text' componentProps={{ type: 'email' }} />
                  </div>
                  <div className='form-section'>
                    <label>Password</label>
                    <FormField id='password' name="password" rules={[{ required: true }]} component='text' componentProps={{ type: 'password' }} />
                  </div>
                  <Button type='primary' size='large' className='button-submit-login' htmlType='submit'>Login</Button>
                </Form>
              </Card>
            </div>
          </Spin>
        );
      }}
    />
  );
};
