import Card from 'antd/es/card/Card';
import styles from '../Article/Article.module.scss';
import { Button, Flex, Tag, Typography, Avatar } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;

function Article({ title, favoritesCount, tagList, author, description, createdAt, slug }) {
  return (
    <Card className={styles.Card} styles={{ body: { padding: 0 } }}>
      <Flex justify="space-between" gap={16}>
        <div>
          <Flex align="center" justify="flex-start" gap="small">
            <Link to={`/articles/${slug}`}>
              <Title className={styles.Title} level={4}>
                {title}
              </Title>
            </Link>
            <Button className={styles.Button}>
              <HeartOutlined />
              {favoritesCount}
            </Button>
          </Flex>
          <Flex wrap>
            {tagList &&
              tagList.map((tag) => {
                if (!tag.length) return;
                return (
                  <Tag className={styles.Tag} key={uuidv4()}>
                    {tag}
                  </Tag>
                );
              })}
          </Flex>
          <Flex>
            <Text className={styles.Text}>{description}</Text>
          </Flex>
        </div>
        <div>
          <Flex gap={6} align="center">
            <Flex vertical>
              <Title level={5} className={styles.Name}>
                {author.username}
              </Title>
              <Text className={styles.Date}>{format(new Date(createdAt), 'PP')}</Text>
            </Flex>
            <Avatar size={64} src={author.image} />
          </Flex>
        </div>
      </Flex>
    </Card>
  );
}

export { Article };
