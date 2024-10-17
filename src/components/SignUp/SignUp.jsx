import { Form, Input, Typography, Button, Checkbox, message, Spin, Alert } from 'antd';
import styles from '../SignUp/SignUp.module.scss';
import { LockOutlined, MailOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateNewUserMutation } from '../../features/api/blogApi';
import { useCallback, useEffect, useState } from 'react';

const { Title } = Typography;
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${value} is not a valid email!',
  },
};
const key = 'updatable';

function SignUp() {
  const [createUser, { data, isSuccess, error, isLoading, reset }] = useCreateNewUserMutation({
    fixedCacheKey: 'new-user',
  });
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [percent, setPercent] = useState(0);
  const showLoader = () => {
    setSpinning(true);
    let ptg = -10;
    const interval = setInterval(() => {
      ptg += 5;
      setPercent(ptg);
      if (ptg > 120) {
        clearInterval(interval);
        setSpinning(false);
        setPercent(0);
      }
    }, 100);
  };

  const successSignIn = useCallback(() => {
    setVisibleAlert(true);
    messageApi.open({
      key,
      type: 'success',
      content: 'Account created successfully!',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Redirection to login page...',
        duration: 1.5,
      });
    }, [1000]);
  }, [messageApi]);

  useEffect(() => {
    if (isSuccess) {
      successSignIn();
      showLoader();
      setTimeout(() => {
        reset();
        navigate('/sign-in');
      }, 2900);
    }
    if (error?.status == 422) {
      setVisibleAlert(true);
      if (error?.data?.errors?.email?.length) {
        form.setFields([{ name: 'email', errors: ['email is already taken'] }]);
      }
      if (error?.data?.errors?.username?.length) {
        form.setFields([{ name: 'username', errors: ['username is already taken'] }]);
      }
    }
  }, [isSuccess, data, error, successSignIn, navigate, form, reset]);

  return (
    <Form
      form={form}
      layout="vertical"
      name="register"
      onFinish={(value) => createUser(value)}
      className={styles.Form}
      validateMessages={validateMessages}
      scrollToFirstError
    >
      {contextHolder}
      {isSuccess && <Spin spinning={spinning} percent={percent} fullscreen />}
      {visibleAlert && error && (
        <Alert
          className={styles.Alert}
          showIcon
          message="Email or username is already taken!"
          type="error"
          closable
          afterClose={() => setVisibleAlert(false)}
        />
      )}
      <Title className={styles.Title} level={4}>
        Create new account
      </Title>
      <Form.Item
        label="Username:"
        name="username"
        autoComplete="off"
        rules={[
          { required: true, massage: 'Please input your username!' },
          { min: 3, max: 20 },
        ]}
      >
        <Input placeholder="Username" size="large" prefix={<UserOutlined />}></Input>
      </Form.Item>
      <Form.Item
        label="Email address:"
        name="email"
        rules={[
          { type: 'email', message: 'The input is not valid Email!' },
          { required: true, message: 'Please input your Email!' },
        ]}
      >
        <Input placeholder="Email address" size="large" prefix={<MailOutlined />} />
      </Form.Item>
      <Form.Item
        label="Password:"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 6, max: 40 },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password" size="large" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item
        label="Repeat Password:"
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Repeat password" size="large" prefix={<UnlockOutlined />} />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement!')),
          },
        ]}
      >
        <Checkbox>I agree to the processing of my personal information</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          disabled={isLoading || visibleAlert}
          className={styles.Button}
          type="primary"
          htmlType="submit"
          block
          size="large"
        >
          Create
        </Button>
        <span className={styles.ButtonSpan}>
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </span>
      </Form.Item>
    </Form>
  );
}

export { SignUp };
