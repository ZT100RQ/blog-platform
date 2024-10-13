import { Form, Input, Typography, Button, Checkbox } from 'antd';
import styles from '../SignUp/SignUp.module.scss';
import { LockOutlined, MailOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

function SignUp() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="vertical"
      name="register"
      onFinish={(value) => console.log(value)}
      className={styles.Form}
      validateMessages={validateMessages}
      scrollToFirstError
      autoComplete="false"
    >
      <Title className={styles.Title} level={4}>
        Create new account
      </Title>
      <Form.Item
        label="Username:"
        name="username"
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
        <Button className={styles.Button} type="primary" htmlType="submit" block size="large">
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
