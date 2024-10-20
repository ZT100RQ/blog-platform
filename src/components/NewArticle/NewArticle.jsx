import { Form, Typography, Button, Input, Space, message, Alert } from 'antd';
import styles from '../NewArticle/NewArticle.module.scss';
import { usePostNewArticleMutation } from '../../features/api/blogApi';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const key = 'updatable';

const transformTags = (tagsArray) => {
  if (!tagsArray) return;
  const tags = tagsArray.map((tag) => tag.tag);
  return tags;
};

function NewArticle() {
  const [form] = Form.useForm();
  const [postArticle, { data, isSuccess, error }] = usePostNewArticleMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const [disabled, setDisabled] = useState(false);
  const successPostArticle = useCallback(() => {
    messageApi.open({
      key,
      type: 'success',
      content: 'The article has been successfully published!',
      duration: 2,
    });
  }, [messageApi]);

  useEffect(() => {
    if (isSuccess) {
      setDisabled(true);
      form.resetFields();
      successPostArticle();
    }
  }, [form, isSuccess, successPostArticle]);

  useEffect(() => {
    if (error?.status == 422 || error?.status == 401) setDisabled(true);
  }, [error]);

  return (
    <Form
      className={styles.Form}
      form={form}
      layout="vertical"
      name="article"
      onFinish={(value) => {
        postArticle({ ...value, tags: transformTags(value.tags) });
      }}
    >
      {contextHolder}
      {isSuccess && (
        <Alert
          className={styles.Alert}
          message="Article added: "
          type="info"
          onClose={() => setDisabled(false)}
          action={
            <Space direction="vertical">
              <Link to={`/articles/${data?.article?.slug}`}>
                <Button size="large" type="text">
                  Click to open
                </Button>
              </Link>
            </Space>
          }
          closable
        />
      )}
      {error?.status == 422 && (
        <Alert
          className={styles.Alert}
          onClose={() => setDisabled(false)}
          message="Unexpected error"
          type="error"
          closable
        />
      )}
      {error?.status == 401 && (
        <Alert
          className={styles.Alert}
          onClose={() => setDisabled(false)}
          message="Error: Unauthorized"
          type="error"
          closable
        />
      )}
      <Title className={styles.Title} level={4}>
        Create new article
      </Title>
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Title cannot be empty!' }]}>
        <Input size="large" placeholder="What is the title of your article?"></Input>
      </Form.Item>
      <Form.Item
        label="Short description"
        name="description"
        rules={[{ required: true, message: 'Short description cannot be empty!' }]}
      >
        <Input size="large" placeholder="A short description is short overview of the article"></Input>
      </Form.Item>
      <Form.Item label="Text" name="body" rules={[{ required: true, message: 'Text cannot be empty!' }]}>
        <Input.TextArea rows={6} size="large" placeholder="Full text of your article"></Input.TextArea>
      </Form.Item>
      <Form.Item>
        <Form.List name="tags">
          {(subFields, subOpt) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 16,
              }}
            >
              {subFields.map((subField, i) => (
                <div key={i}>
                  <Space size="middle">
                    <Form.Item
                      noStyle
                      rules={[{ required: true, message: `Cannot add empty tag #${++i}` }]}
                      name={[subField.name, 'tag']}
                    >
                      <Input placeholder="Tag" size="large" />
                    </Form.Item>
                    <Form.Item noStyle>
                      <Button
                        size="large"
                        danger
                        onClick={() => {
                          subOpt.remove(subField.name);
                        }}
                      >
                        Delete
                      </Button>
                    </Form.Item>
                  </Space>
                </div>
              ))}
              <Button
                size="large"
                className={styles.ButtonAdd}
                color="primary"
                variant="outlined"
                onClick={() => {
                  subOpt.add();
                }}
              >
                + Add TAG.
              </Button>
            </div>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item className={styles.ButtonSend}>
        <Button disabled={disabled} className={styles.Button} htmlType="submit" size="large" type="primary">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
}

export { NewArticle };
