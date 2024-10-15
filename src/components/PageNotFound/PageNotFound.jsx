import { StepBackwardFilled, HomeFilled } from '@ant-design/icons';
import { Result, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <>
          <Link to="/">
            <Button type="primary" size="large" icon={<HomeFilled />}>
              Home page
            </Button>
          </Link>
          <Button onClick={() => navigate(-1)} type="primary" size="large" icon={<StepBackwardFilled />}>
            Go back
          </Button>
        </>
      }
    />
  );
}

export { PageNotFound };
