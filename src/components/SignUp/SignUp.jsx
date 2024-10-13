import { Form, Input, Typography, Button } from 'antd';
import styles from '../SignUp/SignUp.module.scss';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Title } = Typography;

function SignUp() {
  return (
    <Form layout="vertical" className={styles.Form}>
      <Title className={styles.Title} level={4}>
        Create new account
      </Title>
      <Form.Item label="Username:" name="username">
        <Input placeholder="Username" size="large"></Input>
      </Form.Item>
      <Form.Item label="Email address:" name="email">
        <Input placeholder="Email address" size="large" prefix={<MailOutlined />} />
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

export { SignUp };
