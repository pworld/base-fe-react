import React from 'react';
import './styles.scss';
import { AuthPage } from '@refinedev/antd';

import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';

import { Title } from '@/components/layout/title';
import { Button, Card, Form } from 'antd';
import { FormField } from '@/components/forms/form-field/form-field';
import { useRegister } from '@refinedev/core';
import { RegisterParams } from '@/model/apps/auth';

export const RegisterPage: React.FC = () => {
  const [form] = Form.useForm<RegisterParams>();
  const { mutate: register } = useRegister<RegisterParams>();

  return (
    <AuthPage
      type="register"
      title={<Title collapsed={false} />}
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
          <div className='register-section'>
            <Card style={{ width: '400px', margin: 'auto' }}>
              <div className='sign-up-text'>Sign up for your account</div>
              <Form<RegisterParams>
                layout="vertical"
                form={form}
                onFinish={(values) => {
                  register(values);
                }}
                requiredMark={false}
                initialValues={{
                  remember: false,
                }}
              >
                <div className='form-section'>
                  <label>First Name</label>
                  <FormField id='first_name' name="first_name" rules={[{ required: true }]} component='text' />
                </div>
                <div className='form-section'>
                  <label>First Name</label>
                  <FormField id='last_name' name="last_name" rules={[{ required: true }]} component='text' />
                </div>
                <div className='form-section'>
                  <label>Email</label>
                  <FormField id='email' name="email" rules={[{ required: true }]} component='text' componentProps={{ type: 'email' }} />
                </div>
                <div className='form-section'>
                  <label>Password</label>
                  <FormField id='password' name="password" rules={[{ required: true }]} component='text' componentProps={{ type: 'password' }} />
                </div>
                <div className='form-section'>
                  <label>Company Name</label>
                  <FormField id='company_name' name="company_name" rules={[{ required: true }]} component='text' />
                </div>
                <div className='already-have-account'>
                  Have an account? <a href='/'>Sign In</a>
                </div>
                <Button type='primary' size='large' className='button-submit-register' htmlType='submit'>Register</Button>
              </Form>
            </Card>
          </div>
        );
      }}

    />
  );
};
