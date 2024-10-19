import styles from '../../components/ProfilePage/ProfilePage.module.scss';
import { Form, message, Typography, Button, Input, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useUpdateUserMutation } from '../../features/api/blogApi';
import { signInUser } from '../../features/userSlice/userSlice';

const { Title } = Typography;

function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [updateUser, { data, isLoading, error, isSuccess, reset }] = useUpdateUserMutation();
  const [form] = Form.useForm();
  const usernameValue = Form.useWatch('username', form);
  const emailValue = Form.useWatch('email', form);
  const imageValue = Form.useWatch('image', form);
  const passwordValue = Form.useWatch('password', form);
  const [messageApi, contextHolder] = message.useMessage();

  const success = useCallback(() => {
    messageApi.open({
      type: 'success',
      content: 'Success! Your profile was updated.',
    });
  }, [messageApi]);

  useEffect(() => {
    if (error?.data?.errors?.email?.length) {
      form.setFields([{ name: 'email', errors: ['This email is already taken.'] }]);
    }
    if (error?.data?.errors?.username?.length) {
      form.setFields([{ name: 'username', errors: ['This username is already taken.'] }]);
    }
  }, [error, form]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(signInUser(data.user));
      success();
      reset();
    }
  }, [dispatch, isSuccess, data, success, reset]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="register"
        onFinish={(value) => {
          updateUser(value);
          form.setFields([{ name: 'password', value: '' }]);
        }}
        className={styles.Form}
        scrollToFirstError
      >
        {contextHolder}
        <Title className={styles.Title} level={4}>
          Edit Profile
        </Title>
        <Form.Item
          initialValue={user?.username}
          label="Username:"
          name="username"
          autoComplete="off"
          rules={[
            { required: true, massage: 'Please input your username!' },
            { min: 3, max: 20 },
          ]}
        >
          <Input placeholder="Username" size="large" />
        </Form.Item>
        <Form.Item
          label="Email address:"
          initialValue={user?.email}
          name="email"
          rules={[
            { type: 'email', message: 'The input is not valid Email!' },
            { required: true, message: 'Please input your Email!' },
          ]}
        >
          <Input placeholder="Email address" size="large" />
        </Form.Item>
        <Form.Item label="New password:" name="password" rules={[{ min: 6, max: 40 }]}>
          <Input.Password placeholder="New password" size="large" />
        </Form.Item>
        <Form.Item
          initialValue={user?.image}
          label="Avatar image(url):"
          name="image"
          rules={[{ type: 'url', warningOnly: true }]}
        >
          <Input placeholder="Avatar image" size="large" />
        </Form.Item>
        <Form.Item>
          <Flex gap={6}>
            <Button
              disabled={
                isLoading ||
                (usernameValue?.toLowerCase() == user?.username &&
                  emailValue?.toLowerCase() == user?.email &&
                  imageValue == user?.image &&
                  !passwordValue?.length)
              }
              className={styles.Button}
              type="primary"
              htmlType="submit"
              block
              size="large"
            >
              Save
            </Button>
            <Button className={styles.Button} onClick={() => form.resetFields()} block size="large">
              Reset
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
}

export { ProfilePage };
