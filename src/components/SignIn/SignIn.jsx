import { Button, Form, Input, Typography, message, Alert, Spin } from 'antd';
import styles from './SignIn.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../features/userSlice/userSlice';
import { usePostUserLoginMutation } from '../../features/api/blogApi';
import { useCallback, useEffect, useState } from 'react';

const { Title } = Typography;

const alertMessage = (status) => {
  if (status == 422) return 'Your password or email is incorrect!';
  if (status > 300 || status < 200) return 'Houston we have a problem! Errors!';
};

function SignIn() {
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
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
      content: 'Login Successful!',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Redirection to Home page...',
        duration: 1.5,
      });
    }, [1000]);
  }, [messageApi]);

  const navigate = useNavigate();
  const [form] = useForm();
  const dispatch = useDispatch();
  const [userLogin, { data, isLoading, isSuccess, status, error }] = usePostUserLoginMutation();
  const handleLoginButton = (value) => {
    userLogin(value);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(signInUser(data.user));
      localStorage.setItem('blog-platform-userState', JSON.stringify(data.user));
      successSignIn();
      showLoader();
      setTimeout(() => navigate('/'), 2900);
    }
    if (error?.status == 401) {
      setVisibleAlert(true);
    }
    if (error?.status == 422) {
      setVisibleAlert(true);
    }
    return;
  }, [data, dispatch, isSuccess, navigate, status, successSignIn, error]);

  return (
    <Form form={form} layout="vertical" className={styles.Form} onFinish={(value) => handleLoginButton(value)}>
      {isSuccess && <Spin spinning={spinning} percent={percent} fullscreen />}
      {visibleAlert && error && (
        <Alert
          className={styles.Alert}
          showIcon
          message={alertMessage(error?.status)}
          type="error"
          closable
          afterClose={() => setVisibleAlert(false)}
        />
      )}
      <Title className={styles.Title} level={4}>
        Sign In
      </Title>
      {contextHolder}
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
      <Form.Item label="Password:" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password placeholder="Password" size="large" prefix={<LockOutlined />} />
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
          Login
        </Button>
        <span className={styles.ButtonSpan}>
          Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
        </span>
      </Form.Item>
    </Form>
  );
}

export { SignIn };
