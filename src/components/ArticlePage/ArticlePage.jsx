import { useParams } from 'react-router-dom';
import styles from '../ArticlePage/ArticlePage.module.scss';
import { useFetchArticleQuery } from '../../features/api/blogApi';
import { Card, Spin, Typography, Flex, Button, Tag, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { HeartOutlined, LoadingOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import Markdown from 'react-markdown';
import { PageNotFound } from '../PageNotFound/PageNotFound';

const { Title, Text } = Typography;

function ArticlePage() {
  const [loading, setLoading] = useState(null);
  const { title: articleName } = useParams();
  const { data, isLoading, error } = useFetchArticleQuery(articleName);

  useEffect(() => {
    if (isLoading) setLoading(true);
    if (!isLoading) setTimeout(() => setLoading(false), 300);
  }, [isLoading]);

  if (loading) return <Spin className={styles.Spin} indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />;
  if (error?.originalStatus === 404) return <PageNotFound />;
  return (
    <Card className={styles.Card} styles={{ body: { padding: 0 } }}>
      <Flex justify="space-between" gap={16}>
        <div>
          <Flex align="center" justify="flex-start" gap="small">
            <Title className={styles.Title} level={4}>
              {data?.article.title}
            </Title>
            <Button className={styles.Button}>
              <HeartOutlined />
              {data?.article.favoritesCount}
            </Button>
          </Flex>
          <Flex>
            {data?.article.tagList &&
              data.article.tagList.map((tag) => {
                if (!tag.length) return;
                return (
                  <Tag className={styles.Tag} key={uuidv4()}>
                    {tag}
                  </Tag>
                );
              })}
          </Flex>
          <Flex>
            <Text className={styles.Text}>{data?.article.description}</Text>
          </Flex>
        </div>
        <div>
          <Flex gap={6} align="center">
            <Flex vertical>
              <Title level={5} className={styles.Name}>
                {data?.article.author.username}
              </Title>
              {data?.article.createdAt && (
                <Text className={styles.Date}>{format(new Date(data?.article.createdAt), 'PP')}</Text>
              )}
            </Flex>
            <Avatar size={64} src={data?.article.author.image} />
          </Flex>
        </div>
      </Flex>
      <Markdown className={styles.Mark}>{data?.article.body}</Markdown>
    </Card>
  );
}

export { ArticlePage };
