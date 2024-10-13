import { Button, Form, Input, Typography } from 'antd';
import styles from '../SignInForm/SignInForm.module.scss';
import { Link } from 'react-router-dom';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
const { Title } = Typography;

function SignInForm() {
  return (
    <Form layout="vertical" className={styles.Form}>
      <Title className={styles.Title} level={4}>
        Sign In
      </Title>
      <Form.Item label="Email address:" name="email">
        <Input placeholder="Email adress" size="large" prefix={<MailOutlined />} />
      </Form.Item>
      <Form.Item label="Password:" name="password">
        <Input.Password placeholder="Password" size="large" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item>
        <Button className={styles.Button} type="primary" htmlType="submit" block size="large">
          Login
        </Button>
        <span className={styles.ButtonSpan}>
          Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
        </span>
      </Form.Item>
    </Form>
  );
}

export { SignInForm };
