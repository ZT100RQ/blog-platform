import styles from '../ListArticles/ListArticles.module.scss';
import { Article } from '../Article/Article';
import { Flex, Pagination, Spin, Result, Button } from 'antd';
import { useFetchArticlesQuery } from '../../features/api/blogApi';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

function ListArticles() {
  const [num, setNum] = useState(0);
  const [pages, setPages] = useState(null);
  const [loading, setLoading] = useState(null);
  const { data, isLoading, isError } = useFetchArticlesQuery(num, { refetchOnMountOrArgChange: true });
  useEffect(() => {
    setPages(data?.articlesCount);
  }, [data?.articlesCount]);

  useEffect(() => {
    if (!isLoading) setTimeout(() => setLoading(false), 400);
    if (isLoading) setLoading(true);
  }, [isLoading]);

  if (loading) return <Spin className={styles.Spin} indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />;

  if (isError)
    return (
      <Result
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    );

  return (
    <Flex className={styles.List} vertical gap={26}>
      {data?.articles.map((article) => (
        <Article key={uuidv4()} {...article} />
      ))}
      <Pagination
        className={styles.Pagination}
        align="center"
        defaultCurrent={1}
        total={pages}
        pageSize={5}
        showSizeChanger={false}
        onChange={(page, pageSize) => {
          setNum((page - 1) * pageSize);
        }}
      />
    </Flex>
  );
}

export { ListArticles };
